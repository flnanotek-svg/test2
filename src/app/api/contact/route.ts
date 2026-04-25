import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, message, product } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      )
    }

    // In a real application, you would save to database and/or send email
    // For now, we log the request and return success
    console.log('--- New Contact Request ---')
    console.log('Name:', name)
    console.log('Phone:', phone)
    console.log('Email:', email || '—')
    console.log('Product:', product || '—')
    console.log('Message:', message || '—')
    console.log('Time:', new Date().toISOString())
    console.log('---------------------------')

    return NextResponse.json({ success: true, message: 'Заявка принята' })
  } catch {
    return NextResponse.json(
      { error: 'Ошибка обработки запроса' },
      { status: 500 }
    )
  }
}
