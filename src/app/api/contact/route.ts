import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : null
    const message = typeof body.message === 'string' ? body.message.trim() : null
    const product = typeof body.product === 'string' ? body.product.trim() : null

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 }
      )
    }

    await db.contactRequest.create({
      data: {
        name,
        phone,
        email: email || null,
        message: message || null,
        product: product || null,
      },
    })

    console.log('--- New Contact Request ---')
    console.log('Name:', name)
    console.log('Phone:', phone)
    console.log('Email:', email || '—')
    console.log('Product:', product || '—')
    console.log('Message:', message || '—')
    console.log('Time:', new Date().toISOString())
    console.log('---------------------------')

    return NextResponse.json({ success: true, message: 'Заявка принята' })
  } catch (error) {
    console.error('Contact request save failed:', error)
    return NextResponse.json(
      { error: 'Ошибка обработки запроса' },
      { status: 500 }
    )
  }
}
