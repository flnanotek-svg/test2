'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Zap,
  Shield,
  Clock,
  Wrench,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Send,
  Star,
  Gauge,
  Target,
  Factory,
  Truck,
  HeadphonesIcon,
  Award,
  LaserIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'

/* ─── Data ─────────────────────────────────────────────────── */

const products = [
  {
    id: 1,
    name: 'LaserCut Pro 1000',
    subtitle: 'Волоконный лазер 1 кВт',
    price: 'от 2 890 000 ₽',
    image: '/images/product-fiber.png',
    power: '1 кВт',
    thickness: 'до 10 мм',
    area: '1500 × 3000 мм',
    speed: 'до 30 м/мин',
    accuracy: '±0.05 мм',
    features: ['Резка низкоуглеродистой стали', 'Нержавеющая сталь', 'Алюминий', 'Латунь'],
    popular: false,
  },
  {
    id: 2,
    name: 'LaserCut Pro 3000',
    subtitle: 'Волоконный лазер 3 кВт',
    price: 'от 4 790 000 ₽',
    image: '/images/product-co2.png',
    power: '3 кВт',
    thickness: 'до 20 мм',
    area: '1500 × 3000 мм',
    speed: 'до 60 м/мин',
    accuracy: '±0.03 мм',
    features: ['Резка толстолистового металла', 'Высокоскоростная резка', 'Автоподача материала', 'Система охлаждения'],
    popular: true,
  },
  {
    id: 3,
    name: 'LaserCut Compact 500',
    subtitle: 'Настольный лазер 500 Вт',
    price: 'от 1 490 000 ₽',
    image: '/images/product-compact.png',
    power: '500 Вт',
    thickness: 'до 5 мм',
    area: '1000 × 1500 мм',
    speed: 'до 20 м/мин',
    accuracy: '±0.05 мм',
    features: ['Компактные габариты', 'Низкое энергопотребление', 'Простой монтаж', 'Идеален для малого бизнеса'],
    popular: false,
  },
]

const advantages = [
  {
    icon: Gauge,
    title: 'Высокая скорость',
    desc: 'Скорость резки до 60 м/мин — в 5 раз быстрее плазменной резки',
  },
  {
    icon: Target,
    title: 'Точность ±0.03 мм',
    desc: 'Премиальная точность для самых сложных деталей и тонкого металла',
  },
  {
    icon: Shield,
    title: 'Гарантия 3 года',
    desc: 'Расширенная гарантия на всё оборудование и бесплатный ремонт',
  },
  {
    icon: Clock,
    title: 'Работа 24/7',
    desc: 'Станок рассчитан на непрерывную работу в три смены без перегрева',
  },
  {
    icon: Wrench,
    title: 'Пусконаладка за 3 дня',
    desc: 'Бесплатная установка, настройка и обучение вашего персонала',
  },
  {
    icon: Truck,
    title: 'Доставка по всей РФ',
    desc: 'Бесплатная доставка в любой регион России и СНГ',
  },
]

const steps = [
  { num: '01', title: 'Заявка', desc: 'Оставьте заявку на сайте или позвоните нам для подбора станка' },
  { num: '02', title: 'Подбор', desc: 'Наш инженер подберёт оптимальную модель под ваши задачи' },
  { num: '03', title: 'Договор', desc: 'Согласуем условия, сроки поставки и формат оплаты' },
  { num: '04', title: 'Поставка', desc: 'Доставим станок, произведём монтаж и пусконаладку' },
  { num: '05', title: 'Обучение', desc: 'Обучим ваших операторов и обеспечим техподдержку 24/7' },
]

const reviews = [
  { name: 'Алексей Петров', company: 'ООО «МеталлСервис»', text: 'Купили LaserCut Pro 3000 — скорость резки впечатляет. За месяц окупили станок на заказах, которые раньше отдавали на аутсорс.', stars: 5 },
  { name: 'Дмитрий Козлов', company: 'Завод «ПромДеталь»', text: 'Компакт 500 — идеальное решение для нашего цеха. Мало места, а работает как большие станки. Рекомендую малому бизнесу.', stars: 5 },
  { name: 'Ирина Сидорова', company: 'ИП Сидорова', text: 'Сервис на высоте — пусконаладка за 2 дня, обучение провели за полдня. Техподдержка отвечает даже ночью. Спасибо команде!', stars: 5 },
]

const navLinks = [
  { label: 'Станки', href: '#products' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Как купить', href: '#steps' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contact' },
]

/* ─── Animated Section Wrapper ──────────────────────────────── */

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── Main Page ─────────────────────────────────────────────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [quoteProduct, setQuoteProduct] = useState('')
  const { toast } = useToast()

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, product: quoteProduct }),
      })
      if (!res.ok) throw new Error('Ошибка отправки')
      toast({ title: 'Заявка отправлена!', description: 'Мы свяжемся с вами в течение 30 минут.' })
      setContactForm({ name: '', phone: '', email: '', message: '' })
      setQuoteProduct('')
    } catch {
      toast({ title: 'Ошибка', description: 'Не удалось отправить заявку. Позвоните нам.', variant: 'destructive' })
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* ─── HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">LaserPro</span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+78001234567" className="flex items-center gap-1.5 text-sm font-semibold">
              <Phone className="w-4 h-4" />
              8 (800) 123-45-67
            </a>
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0" asChild>
              <a href="#contact">Заказать звонок</a>
            </Button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Меню">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <Separator />
                <a href="tel:+78001234567" className="flex items-center gap-2 text-sm font-semibold py-2">
                  <Phone className="w-4 h-4" />
                  8 (800) 123-45-67
                </a>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 w-full" asChild>
                  <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Заказать звонок</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* ─── HERO ─── */}
        <section className="relative pt-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800" />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url(/images/hero-laser.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <Badge className="mb-4 bg-orange-500/20 text-orange-400 border-orange-500/30 hover:bg-orange-500/30">
                  <Zap className="w-3 h-3 mr-1" /> Лидер продаж 2025
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
              >
                Лазерные станки
                <br />
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  для резки металла
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6 text-lg md:text-xl text-zinc-300 max-w-2xl"
              >
                Волоконные лазерные станки от 500 Вт до 12 кВт. Точность ±0.03 мм, скорость до 60 м/мин.
                Доставка по всей России, гарантия 3 года.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 text-base px-8" asChild>
                  <a href="#products">Подобрать станок <ArrowRight className="w-4 h-4 ml-2" /></a>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-zinc-600 hover:bg-zinc-800 text-base px-8" asChild>
                  <a href="#contact">Получить прайс</a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-12 grid grid-cols-3 gap-6 max-w-lg"
              >
                {[
                  { value: '500+', label: 'Станков в работе' },
                  { value: '3 года', label: 'Гарантия' },
                  { value: '24/7', label: 'Техподдержка' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold text-orange-400">{stat.value}</div>
                    <div className="text-sm text-zinc-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── PRODUCTS ─── */}
        <section id="products" className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-14">
              <Badge variant="secondary" className="mb-3">Каталог</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold">Наши лазерные станки</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Подберём станок под ваши задачи — от компактных решений для малого бизнеса до промышленных мощностей
              </p>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product, idx) => (
                <AnimatedSection key={product.id} delay={idx * 0.15}>
                  <Card className="relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                    {product.popular && (
                      <div className="absolute top-4 right-4 z-10">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">Хит продаж</Badge>
                      </div>
                    )}
                    <div className="aspect-square bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{product.subtitle}</p>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        {[
                          { icon: Zap, label: 'Мощность', value: product.power },
                          { icon: LayersIcon, label: 'Толщина', value: product.thickness },
                          { icon: MaximizeIcon, label: 'Рабочая зона', value: product.area },
                          { icon: Gauge, label: 'Скорость', value: product.speed },
                        ].map((spec) => (
                          <div key={spec.label} className="flex items-start gap-2">
                            <spec.icon className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                            <div>
                              <div className="text-muted-foreground text-xs">{spec.label}</div>
                              <div className="font-semibold">{spec.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {product.features.map((f) => (
                          <span key={f} className="text-xs bg-muted px-2 py-1 rounded-md">{f}</span>
                        ))}
                      </div>

                      <div className="mt-auto pt-6">
                        <div className="text-2xl font-extrabold text-orange-600">{product.price}</div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              className="mt-3 w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0"
                              onClick={() => setQuoteProduct(product.name)}
                            >
                              Запросить КП <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Запросить коммерческое предложение</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleContactSubmit} className="space-y-4 mt-2">
                              <Input placeholder="Ваше имя" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} required />
                              <Input placeholder="Телефон" type="tel" value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} required />
                              <Input placeholder="Email" type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required />
                              <Input value={quoteProduct} readOnly className="bg-muted" />
                              <Textarea placeholder="Комментарий к заказу" value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={3} />
                              <Button type="submit" disabled={sending} className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0">
                                {sending ? 'Отправка...' : 'Отправить заявку'} <Send className="w-4 h-4 ml-2" />
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection className="mt-12 text-center" delay={0.4}>
              <p className="text-muted-foreground mb-4">Нужен станок мощнее? У нас есть модели от 6 до 12 кВт</p>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Запросить каталог <ArrowRight className="w-4 h-4 ml-2" /></a>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── LASER ACTION BANNER ─── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src="/images/laser-action.png" alt="Лазерная резка металла" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/80 to-zinc-900/60" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <AnimatedSection>
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  Резка металла <span className="text-orange-400">нового уровня</span>
                </h2>
                <p className="mt-4 text-zinc-300 text-lg">
                  Волоконный лазер режет сталь, нержавейку, алюминий, медь и латунь.
                  Без расходников, без деформации кромки, без заусенцев.
                </p>
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {[
                    { value: '±0.03', unit: 'мм', label: 'Точность' },
                    { value: '60', unit: 'м/мин', label: 'Скорость' },
                    { value: '25', unit: 'мм', label: 'Макс. толщина' },
                    { value: '100 000', unit: 'ч', label: 'Ресурс лазера' },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl md:text-3xl font-extrabold text-orange-400">
                        {s.value} <span className="text-base font-normal text-zinc-400">{s.unit}</span>
                      </div>
                      <div className="text-sm text-zinc-400 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ─── ADVANTAGES ─── */}
        <section id="advantages" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-14">
              <Badge variant="secondary" className="mb-3">Преимущества</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold">Почему выбирают нас</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Мы не просто продаём станки — мы обеспечиваем полный цикл от подбора до сервиса
              </p>
            </AnimatedSection>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advantages.map((adv, idx) => (
                <AnimatedSection key={adv.title} delay={idx * 0.1}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:from-orange-500/30 group-hover:to-red-500/30 transition-colors">
                        <adv.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-bold">{adv.title}</h3>
                      <p className="mt-2 text-muted-foreground text-sm">{adv.desc}</p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ─── HOW TO BUY / STEPS ─── */}
        <section id="steps" className="py-20 md:py-28 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-14">
              <Badge variant="secondary" className="mb-3">Процесс</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold">Как приобрести станок</h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                От заявки до запуска — простой и прозрачный процесс
              </p>
            </AnimatedSection>

            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0" />

              <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-8">
                {steps.map((step, idx) => (
                  <AnimatedSection key={step.num} delay={idx * 0.12}>
                    <div className="text-center">
                      <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                        <span className="text-2xl font-extrabold text-white">{step.num}</span>
                      </div>
                      <h3 className="text-lg font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── REVIEWS ─── */}
        <section id="reviews" className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-14">
              <Badge variant="secondary" className="mb-3">Отзывы</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold">Что говорят клиенты</h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <AnimatedSection key={review.name} delay={idx * 0.15}>
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: review.stars }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                      <Separator className="my-4" />
                      <div>
                        <div className="font-semibold text-sm">{review.name}</div>
                        <div className="text-xs text-muted-foreground">{review.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA / CONTACT ─── */}
        <section id="contact" className="py-20 md:py-28 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              <AnimatedSection>
                <Badge className="mb-3 bg-orange-500/20 text-orange-400 border-orange-500/30">Свяжитесь с нами</Badge>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  Получите расчёт <span className="text-orange-400">за 30 минут</span>
                </h2>
                <p className="mt-4 text-zinc-300">
                  Оставьте заявку — наш инженер подберёт станок под ваши задачи и подготовит коммерческое предложение.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    { icon: Phone, label: '8 (800) 123-45-67', sub: 'Бесплатно по России' },
                    { icon: Mail, label: 'info@laserpro.ru', sub: 'Ответим в течение часа' },
                    { icon: MapPin, label: 'г. Москва, ул. Промышленная 12', sub: 'Шоурум и склад' },
                  ].map((c) => (
                    <div key={c.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center shrink-0">
                        <c.icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{c.label}</div>
                        <div className="text-sm text-zinc-400">{c.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  {[
                    { icon: CheckCircle2, text: 'Бесплатный выезд инженера' },
                    { icon: CheckCircle2, text: 'Расчёт окупаемости' },
                    { icon: CheckCircle2, text: 'Лизинг и рассрочка' },
                    { icon: CheckCircle2, text: 'Trade-in старого оборудования' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-sm text-zinc-300">
                      <item.icon className="w-4 h-4 text-orange-400 shrink-0" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <Card className="border-border/50 shadow-2xl">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-1">Оставить заявку</h3>
                    <p className="text-sm text-muted-foreground mb-6">Заполните форму и мы свяжемся с вами</p>

                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Имя *</label>
                        <Input
                          placeholder="Иван Иванов"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Телефон *</label>
                        <Input
                          placeholder="+7 (___) ___-__-__"
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Email</label>
                        <Input
                          placeholder="ivan@company.ru"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 block">Интересующий станок</label>
                        <Input
                          placeholder="Например: LaserCut Pro 3000"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={sending}
                        size="lg"
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0"
                      >
                        {sending ? 'Отправка...' : 'Отправить заявку'} <Send className="w-4 h-4 ml-2" />
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-zinc-950 text-zinc-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-white">LaserPro</span>
              </div>
              <p className="text-sm leading-relaxed">
                Производство и поставка волоконных лазерных станков для резки металла с 2015 года.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Оборудование</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#products" className="hover:text-white transition-colors">LaserCut Pro 1000</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">LaserCut Pro 3000</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">LaserCut Compact 500</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Станки 6–12 кВт</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Компания</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#advantages" className="hover:text-white transition-colors">Преимущества</a></li>
                <li><a href="#steps" className="hover:text-white transition-colors">Как купить</a></li>
                <li><a href="#reviews" className="hover:text-white transition-colors">Отзывы</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> 8 (800) 123-45-67</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@laserpro.ru</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Москва, ул. Промышленная 12</li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-zinc-800" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>&copy; 2025 LaserPro. Все права защищены.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ─── Inline icons (not in lucide) ─── */

function LayersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m22.4 12.08-8.58 3.91a2 2 0 0 1-1.66 0L2.6 12.08" />
    </svg>
  )
}

function MaximizeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6" /><path d="M9 21H3v-6" /><path d="m21 3-7 7" /><path d="m3 21 7-7" />
    </svg>
  )
}
