import fs from 'fs'
import path from 'path'

export async function GET() {
    const filePath = path.join(process.cwd(), 'questions.json')
    const fileData = fs.readFileSync(filePath)  
    const data = JSON.parse(fileData)
   
    return Response.json({ data })
  }