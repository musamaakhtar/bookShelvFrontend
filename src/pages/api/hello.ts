import connectMongo from '../../../database/conn'

export default function handler(req : any , res :any) {
  connectMongo()
  res.status(200).json({ name: 'DataBase is connected' })
}
