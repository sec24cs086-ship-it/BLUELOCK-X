import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from 'react'
import { BarChart3, Cpu, Globe2, Zap, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { StatsCard } from '@/components/ui/stats-card'
import { InsightCard } from '@/components/ui/insight-card'
import { CarbonScoreCard } from '@/components/ui/carbon-score-card'
import { ConfidenceIndicator } from '@/components/ui/confidence-indicator'
import { AccordionItem } from '@/components/ui/accordion'
import { ReceiptUpload } from '@/components/ui/receipt-upload'
import { Footer } from '@/components/ui/footer'
import { Badge } from '@/components/ui/badge'



const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
}

const metrics = [
  { label: '98%', value: 'Receipt recognition', icon: Sparkles },
  { label: '3.2x', value: 'Faster sustainability insights', icon: Zap },
  { label: '12M+', value: 'Items cataloged', icon: BarChart3 },
]

const workflow = [
  { title: 'Upload receipt', description: 'Securely upload receipts from any retailer.', icon: Truck },
  { title: 'Extract products', description: 'AI-powered OCR maps items and details.', icon: Cpu },
  { title: 'Measure impact', description: 'Carbon footprint scores in seconds.', icon: Globe2 },
]

const engines = [
  { title: 'OCR Engine', description: 'High fidelity document extraction with adaptive parsing.', icon: Sparkles },
  { title: 'Carbon Engine', description: 'Deterministic lifecycle and transport emissions scoring.', icon: ShieldCheck },
  { title: 'Recommendation Engine', description: 'Lower-carbon alternatives tailored to your basket.', icon: Star },
]

const features = [
  { title: 'Receipt intelligence', description: 'Automated product recognition and insights.' },
  { title: 'Sustainability reports', description: 'Shareable impact summaries and trends.' },
  { title: 'AI-driven recommendations', description: 'Personalized lower-carbon alternatives.' },
  { title: 'Retail interoperability', description: 'Unified product data across stores and brands.' },
]

const faqs = [
  { question: 'How does EcoLens handle different receipt formats?', answer: 'The platform supports PDF and image receipts, using adaptive OCR and parsing to extract the right fields across retailers.' },
  { question: 'Is my purchase data secure?', answer: 'Yes. Files are stored with encryption at rest, and user data is protected with secure authentication and access controls.' },
  { question: 'Can I export sustainability reports?', answer: 'Export ready-made reports and analytics summaries in PDF or CSV formats when the integration is available.' },
]

const kpiStats = [
  { label: 'CO₂ saved', value: 18.4, suffix: 'k', decimals: 1 },
  { label: 'Recommendations generated', value: 4.7, suffix: 'k', decimals: 1 },
  { label: 'Product matches', value: 12, suffix: 'M+', decimals: 0 },
]

const testimonials = [
  {
    name: 'Ava Chen',
    role: 'Head of Sustainability, Veridian Retail',
    quote: '“EcoLens gave us a clear carbon score for every purchase, turning retail data into fast, actionable sustainability insights.”',
  },
  {
    name: 'Jordan Miles',
    role: 'Operations Lead, Saffron Goods',
    quote: '“The receipt workflow demo feels premium and the AI recommendations are easy to follow — ideal for our teams and customers.”',
  },
]

const receiptBoundingBoxes = [
  { top: 'top-16', left: 'left-6', width: 'w-24', height: 'h-10' },
  { top: 'top-32', left: 'left-14', width: 'w-28', height: 'h-10' },
  { top: 'top-48', left: 'left-8', width: 'w-20', height: 'h-10' },
]

function AnimatedNumber({ value, suffix = '', decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 16 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    motionValue.set(value)
    const unsubscribe = springValue.on('change', (latest) => {
      const formatted = Number(latest).toFixed(decimals)
      setDisplay(formatted)
    })
    return () => unsubscribe()
  }, [motionValue, springValue, value, decimals])

  return <span>{display}{suffix}</span>
}

export function LandingPage() {
  const heroSteps = useMemo(
    () => [
      { title: 'Upload', subtitle: 'Receipt capture', active: true },
      { title: 'OCR scan', subtitle: 'Text extraction', active: false },
      { title: 'Product detection', subtitle: 'Line item match', active: false },
      { title: 'Carbon analysis', subtitle: 'Footprint scoring', active: false },
      { title: 'Recommendation', subtitle: 'Lower-carbon options', active: false },
    ],
    [],
  )

  const dashboardBars = [
    { label: 'Groceries', value: 72 },
    { label: 'Home goods', value: 54 },
    { label: 'Electronics', value: 38 },
  ]

  return (
    <motion.div initial="hidden" animate="visible" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="relative overflow-hidden rounded-[40px] border border-slate-800/80 bg-slate-950/70 p-10 shadow-[0_40px_120px_rgba(2,6,23,0.35)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.14),_transparent_30%)]" />
        <div className="pointer-events-none absolute right-0 top-20 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <motion.div variants={itemVariants} className="space-y-8">
            <Badge variant="secondary">AI-powered carbon intelligence</Badge>
            <div className="space-y-5">
              <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.05em] text-slate-100 sm:text-6xl">Make every receipt a sustainability story.</h1>
              <p className="max-w-xl text-lg leading-8 text-slate-400">EcoLens AI transforms shopping receipts into actionable carbon insights, recommending greener alternatives and turning purchases into measurable progress.</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
                <Link to="/auth">
                  <Button size="lg">Sign In</Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
                <Link to="/auth/register">
                  <Button variant="ghost" size="lg">Create Account</Button>
                </Link>
              </motion.div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {metrics.map((metric, index) => (
                <motion.div key={metric.label} variants={itemVariants} transition={{ delay: index * 0.08 }}>
                  <Card className="rounded-[28px] border-slate-800 bg-slate-900/85 p-5">
                    <div className="flex items-center gap-3 text-emerald-300">
                      <metric.icon size={22} />
                      <span className="text-sm uppercase tracking-[0.13em] text-slate-500">{metric.label}</span>
                    </div>
                    <p className="mt-4 text-3xl font-semibold text-slate-100">{metric.value}</p>
                  </Card>
                </motion.div>
              ))}
            </div>            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {kpiStats.map((stat, index) => (
                <motion.div key={stat.label} variants={itemVariants} transition={{ delay: index * 0.08 }}>
                  <Card className="rounded-[28px] border-slate-800 bg-slate-900/85 p-5">
                    <p className="text-sm uppercase tracking-[0.13em] text-slate-500">{stat.label}</p>
                    <p className="mt-4 text-3xl font-semibold text-slate-100">
                      <AnimatedNumber value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>          </motion.div>

          <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[36px] border border-slate-800 bg-slate-950/70 p-6 shadow-[0_30px_60px_rgba(2,6,23,0.38)] backdrop-blur-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_20%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.14),_transparent_18%)]" />
            <div className="absolute left-6 top-6 h-10 w-10 rounded-full bg-slate-800/70 ring-1 ring-emerald-400/20 blur-sm" />
            <div className="relative z-10 grid gap-6">
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-6">
                <p className="text-sm text-slate-400">Preview</p>
                <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">EcoLens Receipt</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Live demo</span>
                  </div>
                  <div className="relative mt-10 h-64 overflow-hidden rounded-[32px] bg-slate-950/80 p-5">
                    <motion.div className="absolute inset-x-5 top-8 h-0.5 rounded-full bg-emerald-400/30" animate={{ x: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} />
                    {receiptBoundingBoxes.map((box, index) => (
                      <motion.div
                        key={index}
                        className={`absolute border border-emerald-300/60 ${box.top} ${box.left} ${box.width} ${box.height}`}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 3, delay: index * 0.3, repeat: Infinity }}
                      />
                    ))}
                    <div className="relative space-y-3">
                      <div className="h-4 w-28 rounded-full bg-slate-800" />
                      <div className="h-4 w-44 rounded-full bg-slate-800" />
                      <div className="h-4 w-32 rounded-full bg-slate-800" />
                      <div className="h-4 w-52 rounded-full bg-slate-800" />
                      <div className="h-4 w-20 rounded-full bg-slate-800" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/90 p-6">
                <p className="text-sm text-slate-400">Experience</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-100">AI receipt scanning in motion</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">An immersive preview of upload, OCR, product detection, carbon scoring and recommendation flow.</p>
                <div className="mt-6 grid gap-3">
                  {heroSteps.map((step) => (
                    <motion.div key={step.title} whileHover={{ x: 4 }} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 transition-shadow duration-200 hover:shadow-[0_20px_45px_-20px_rgba(16,185,129,0.45)]">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-100">{step.title}</p>
                          <p className="text-xs text-slate-500">{step.subtitle}</p>
                        </div>
                        <div className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${step.active ? 'bg-emerald-500/15 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                          {step.active ? 'Active' : 'Queued'}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-12 grid gap-8 lg:grid-cols-3">
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-semibold text-slate-100">Trusted by sustainability leaders.</h2>
          <p className="mt-4 text-slate-400">Global operations rely on EcoLens to transform shopping data into measurable carbon reduction insights.</p>
        </motion.div>
        {metrics.map((item, index) => (
          <motion.div key={item.label} variants={itemVariants} transition={{ delay: index * 0.08 }}>
            <Card className="rounded-[28px] border-slate-800/80 bg-slate-950/75 p-6">
              <div className="flex items-center gap-3 text-emerald-300">
                <item.icon size={20} />
                <span className="text-sm uppercase tracking-[0.18em] text-slate-500">{item.label}</span>
              </div>
              <p className="mt-4 text-4xl font-semibold text-slate-100">{item.value}</p>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16 grid gap-12 lg:grid-cols-2">
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl font-semibold text-slate-100">Why receipts matter for climate action.</h2>
          <p className="mt-6 text-lg leading-8 text-slate-400">Most shoppers never see the environmental impact of everyday purchases. EcoLens turns every receipt into an opportunity to reduce carbon and make smarter choices.</p>
        </motion.div>
        <motion.div variants={itemVariants} className="grid gap-6">
          {workflow.map((item) => (
            <Card key={item.title} className="rounded-[28px] border-slate-800/80 bg-slate-950/75 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-3xl bg-slate-900/80 p-3 text-emerald-300">
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {engines.map((engine, index) => (
            <motion.div key={engine.title} variants={itemVariants} transition={{ delay: index * 0.08 }}>
              <InsightCard title={engine.title} content={engine.description} badge="Core AI" icon={<engine.icon size={20} />} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div variants={itemVariants} className="grid gap-6">
          <Card className="rounded-[32px] border-slate-800/80 bg-slate-950/80 p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Frontend demo</p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-100">Interactive receipt workflow</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">See how EcoLens transforms a purchase into a clear sustainability insight using modern receipt processing visuals.</p>
              </div>
              <Badge variant="success">Demo</Badge>
            </div>
            <div className="mt-8">
              <ReceiptUpload onFileSelect={() => undefined} />
            </div>
          </Card>
          <Card className="rounded-[32px] border-slate-800/80 bg-slate-950/80 p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <CarbonScoreCard score="A+" trend="-18% vs. last month" details="Excellent purchase footprint" />
              <ConfidenceIndicator confidence={88} />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[32px] border border-slate-800/80 bg-slate-950/80 p-8">
          <div className="pointer-events-none absolute -right-10 top-6 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Dashboard preview</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-100">Premium analytics snapshot</h2>
            </div>
            <motion.div whileHover={{ y: -3 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
              <Button variant="ghost" size="sm">Explore metrics</Button>
            </motion.div>
          </div>
          <div className="mt-8 grid gap-6">
            <div className="grid gap-4 rounded-[28px] bg-slate-900/80 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-400">Weekly carbon trend</span>
                <span className="text-sm font-semibold text-slate-100">Up next</span>
              </div>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.75 }} className="origin-left h-48 rounded-[28px] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {dashboardBars.map((item, index) => (
                <motion.div key={item.label} variants={itemVariants} transition={{ delay: index * 0.08 }} className="rounded-[28px] border border-slate-800/80 bg-slate-900/80 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="text-lg font-semibold text-slate-100">{item.value}%</p>
                  </div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-800">
                    <motion.div className="h-full rounded-full bg-emerald-400" initial={{ scaleX: 0 }} animate={{ scaleX: item.value / 100 }} transition={{ duration: 0.8 }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div key={feature.title} variants={itemVariants} transition={{ delay: index * 0.08 }}>
              <Card className="rounded-[28px] border-slate-800/80 bg-slate-950/80 p-6">
                <h3 className="text-xl font-semibold text-slate-100">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16 rounded-[32px] border border-slate-800/80 bg-slate-950/80 p-10 shadow-[0_30px_80px_rgba(2,6,23,0.35)] backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-[0.6fr_1fr] lg:items-center">
          <motion.div variants={itemVariants}>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-300">Retail integration</p>
            <h2 className="mt-4 text-4xl font-semibold text-slate-100">Built for modern retail ecosystems.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-400">EcoLens connects with POS and inventory systems to enhance product matching, availability data, and sustainable recommendations across stores.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-2">
            <Card className="rounded-[28px] border-slate-800/80 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Availability</p>
              <p className="mt-3 text-lg font-semibold text-slate-100">Real-time product data</p>
            </Card>
            <Card className="rounded-[28px] border-slate-800/80 bg-slate-900/80 p-5">
              <p className="text-sm uppercase tracking-[0.16em] text-slate-500">Pricing</p>
              <p className="mt-3 text-lg font-semibold text-slate-100">Retail-aware recommendations</p>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div variants={itemVariants} className="grid gap-6">
          <StatsCard title="CO₂ saved" value="18.4k kg" description="Across processed purchases" icon={<Globe2 size={22} />} />
          <StatsCard title="Recommendations" value="4.7k" description="Lower-carbon alternatives generated" icon={<Star size={22} />} />
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-[28px] border border-slate-800/80 bg-slate-950/80 p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Footprint reduction</p>
              <p className="mt-3 text-4xl font-semibold text-slate-100">27%</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Active users</p>
              <p className="mt-3 text-4xl font-semibold text-slate-100">72k</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16 grid gap-6">
        <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/80 p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Demo testimonials</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-100">Customer voices from our demo preview</h2>
            </div>
            <Badge variant="secondary">Demo content</Badge>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="rounded-[28px] border-slate-800/80 bg-slate-900/80 p-6">
                <p className="text-sm text-slate-400">{testimonial.quote}</p>
                <div className="mt-4 text-sm text-slate-500">{testimonial.name} · {testimonial.role}</div>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16 grid gap-6">
        <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/80 p-8">
          <h2 className="text-4xl font-semibold text-slate-100">Frequently asked questions</h2>
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} title={faq.question} description={faq.answer} />
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants} className="mt-16 rounded-[32px] border border-slate-800/80 bg-slate-950/80 p-10 text-center shadow-[0_35px_90px_rgba(2,6,23,0.32)] backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Ready to refine your footprint?</p>
        <h2 className="mt-4 text-4xl font-semibold text-slate-100">Launch EcoLens AI for your organization today.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-400">A premium landing experience built for modern retailers, sustainability teams, and conscious shoppers.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
            <Button size="lg">Book a demo</Button>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 240, damping: 18 }}>
            <Button variant="outline" size="lg">Contact sales</Button>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </motion.div>
  )
}
