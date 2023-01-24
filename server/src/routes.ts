import { FastifyInstance } from 'fastify';
import {z} from 'zod'
import dayjs from 'dayjs';

import { prisma } from "./lib/prisma"
export async function appRoutes(app : FastifyInstance){
    app.post('/habits',async (request) => {

        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(z.number())
        })

        const { title, weekDays} =  createHabitBody.parse(request.body)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data:{
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map( weeekDay =>{
                        return{
                            week_day: weeekDay,
                        }
                    })
                }
            }
        })
    })
    app.get('/day', async (request) =>{

        const getDayParams = z.object({
            date: z.coerce.date()
        })
        const {date} = getDayParams.parse(request.query)

        const parseDate = dayjs(date).startOf('day')
        const weekDay = parseDate.get('day')

        const possibleHabits = await prisma.habit.findMany({
            where:{
                created_at: {
                    lte: date,
                },
                weekDays:{
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })
        const day = await prisma.day.findUnique({
            where:{
                date: parseDate.toDate(),
            },
            include:{
                DayHabits: true,
            }
        })

        const completeHabits = day?.DayHabits.map(dayHabit =>{
            return dayHabit.habit_id
        })
        return{
            possibleHabits,  
            completeHabits,
        }
    })

}