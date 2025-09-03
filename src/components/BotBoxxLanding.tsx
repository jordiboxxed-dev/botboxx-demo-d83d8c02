import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { 
  Zap, 
  Target, 
  DollarSign, 
  Settings, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Star,
  Play,
  Bot,
  MessageCircle,
  BarChart3,
  Calendar,
  Volume2,
  FileText,
  Globe,
  Users,
  Shield,
  Smartphone,
  Brain,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import heroImage from '@/assets/hero-dashboard.jpg';

const BotBoxxLanding = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone || null
        });
      
      if (error) throw error;
      
      toast({
        title: "¡Éxito!",
        description: "Tu información ha sido enviada. Te contactaremos pronto.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu información. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-grid">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-6xl mx-auto">
            <Badge className="mb-8 px-6 py-2 text-lg glass-card">
              ✅ Sin instalaciones • ⚡ Listo en minutos • 🔄 100% Gratis
            </Badge>
            
            <h1 className="heading-xl mb-8">
              Creá tu <span className="gradient-text">Agente IA</span> en 5 Minutos y 
              <br />Automatizá tus <span className="gradient-text">Ventas 24/7</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              La única plataforma que convierte tu información en un vendedor virtual que nunca duerme, 
              califica leads automáticamente y llena tu agenda con clientes listos para comprar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button onClick={scrollToForm} className="btn-hero text-xl px-12 py-6 glow-hover">
                PROBAR GRATIS AHORA
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button onClick={scrollToForm} className="btn-secondary text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                COMENZAR AHORA
              </Button>
            </div>
            
            {/* VSL Video Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="feature-card p-8">
                <h3 className="text-2xl font-bold text-center mb-6">
                  🎥 Mira cómo <span className="gradient-text">BotBoxx</span> transforma tu negocio
                </h3>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center border border-primary/20">
                  {/* Replace this div with your YouTube embed or video player */}
                  <div className="text-center">
                    <Play className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">
                      Coloca aquí tu video VSL de YouTube
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      iframe src="https://www.youtube.com/embed/TU_VIDEO_ID"
                    </p>
                  </div>
                </div>
              </Card>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="BotBoxx AI Agent Dashboard" 
                className="rounded-3xl shadow-2xl glow max-w-4xl mx-auto animate-float"
              />
              <div className="absolute -top-4 -right-4 bg-success text-success-foreground px-4 py-2 rounded-full animate-pulse-glow">
                <span className="font-bold">ONLINE 24/7</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8">
              Más de <span className="font-bold text-accent">2,847</span> empresas ya automatizaron sus ventas
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground mb-12 text-lg">Empresas que confían en BotBoxx</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="glass-card p-6 rounded-lg">
                <div className="bg-muted/20 h-8 rounded"></div>
              </div>
            ))}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <Card className="feature-card text-center">
              <BarChart3 className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">95%</h3>
              <p className="text-muted-foreground">de consultas resueltas automáticamente</p>
            </Card>
            <Card className="feature-card text-center">
              <TrendingUp className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">300%</h3>
              <p className="text-muted-foreground">más leads calificados</p>
            </Card>
            <Card className="feature-card text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">70%</h3>
              <p className="text-muted-foreground">reducción en tiempo de respuesta</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Agitation Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">¿Te Suena <span className="gradient-text">Familiar?</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="feature-card border-danger/20">
              <div className="text-6xl mb-4">😴</div>
              <h3 className="text-xl font-bold mb-4">Perdés ventas mientras dormís</h3>
              <p className="text-muted-foreground">Los clientes consultan a cualquier hora, pero vos no podés responder 24/7</p>
            </Card>
            
            <Card className="feature-card border-danger/20">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-xl font-bold mb-4">Tu equipo está saturado</h3>
              <p className="text-muted-foreground">Responden las mismas preguntas básicas mil veces en lugar de cerrar ventas</p>
            </Card>
            
            <Card className="feature-card border-danger/20">
              <div className="text-6xl mb-4">💸</div>
              <h3 className="text-xl font-bold mb-4">Los leads se van a la competencia</h3>
              <p className="text-muted-foreground">Por cada hora sin responder, perdés clientes potenciales</p>
            </Card>
            
            <Card className="feature-card border-danger/20">
              <div className="text-6xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-4">Gastás una fortuna en personal</h3>
              <p className="text-muted-foreground">Pagás salarios altos solo para responder preguntas repetitivas</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Demo Section */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <h2 className="heading-lg mb-8">
            Conocé <span className="gradient-text">BotBoxx</span>: Tu Vendedor Virtual 24/7
          </h2>
          
          <div className="glass-card p-8 rounded-3xl max-w-4xl mx-auto mb-12">
            <div className="aspect-video bg-muted/10 rounded-2xl flex items-center justify-center mb-6">
              <div className="text-center">
                <Bot className="h-16 w-16 text-primary mx-auto mb-4" />
                <p className="text-xl font-semibold">Demo Interactivo</p>
                <p className="text-muted-foreground">Probá BotBoxx ahora mismo</p>
              </div>
            </div>
            
            <Button className="btn-hero text-lg px-8 py-4">
              👆 PROBAR EL DEMO AHORA MISMO
            </Button>
            <p className="text-sm text-muted-foreground mt-4">No necesitas registrarte</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">Por Qué las Empresas Eligen <span className="gradient-text">BotBoxx</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card">
              <Zap className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">⚡ Configuración Instantánea</h3>
              <p className="text-muted-foreground">Pegás tu información y en 5 minutos tenés tu agente listo para trabajar</p>
            </Card>
            
            <Card className="feature-card">
              <Target className="h-12 w-12 text-accent mb-6" />
              <h3 className="text-xl font-bold mb-4">🎯 Califica Leads Automáticamente</h3>
              <p className="text-muted-foreground">Solo pasa a tu equipo clientes que realmente pueden comprar</p>
            </Card>
            
            <Card className="feature-card">
              <DollarSign className="h-12 w-12 text-success mb-6" />
              <h3 className="text-xl font-bold mb-4">💰 ROI Inmediato</h3>
              <p className="text-muted-foreground">Reduce costos operativos mientras aumentás las conversiones</p>
            </Card>
            
            <Card className="feature-card">
              <Settings className="h-12 w-12 text-secondary mb-6" />
              <h3 className="text-xl font-bold mb-4">🔧 Cero Mantenimiento</h3>
              <p className="text-muted-foreground">Se actualiza solo, funciona 24/7 sin intervención</p>
            </Card>
            
            <Card className="feature-card">
              <TrendingUp className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4">📈 Escala Ilimitada</h3>
              <p className="text-muted-foreground">Atiende 1000 consultas simultáneas sin sudar</p>
            </Card>
            
            <Card className="feature-card">
              <Brain className="h-12 w-12 text-accent mb-6" />
              <h3 className="text-xl font-bold mb-4">🧠 Aprende Continuamente</h3>
              <p className="text-muted-foreground">Mejora sus respuestas con cada interacción</p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">3 Pasos Para <span className="gradient-text">Automatizar Tus Ventas</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="feature-card text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">📝 Cargás tu Info</h3>
              <p className="text-muted-foreground">Pegás texto, subís PDFs o importás desde tu web en segundos</p>
            </Card>
            
            <Card className="feature-card text-center">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-secondary">2</span>
              </div>
              <Brain className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">🤖 Se Entrena Solo</h3>
              <p className="text-muted-foreground">La IA aprende tu negocio automáticamente, sin configuraciones complejas</p>
            </Card>
            
            <Card className="feature-card text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">🚀 Compartís y Vendés</h3>
              <p className="text-muted-foreground">Lo publicás en tu web y empieza a trabajar 24/7 generando leads</p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button className="btn-hero text-xl px-12 py-6">
              EMPEZAR AHORA GRATIS
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Technical Features Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">Tecnología de Punta, <span className="gradient-text">Fácil de Usar</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="feature-card text-center">
              <Volume2 className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Reconocimiento de voz</h3>
              <p className="text-sm text-muted-foreground">Comprende comandos de voz naturalmente</p>
            </Card>
            
            <Card className="feature-card text-center">
              <MessageCircle className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Síntesis de voz</h3>
              <p className="text-sm text-muted-foreground">Responde con voz natural y personalizada</p>
            </Card>
            
            <Card className="feature-card text-center">
              <FileText className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-2">Procesa PDFs</h3>
              <p className="text-sm text-muted-foreground">Lee y entiende documentos automáticamente</p>
            </Card>
            
            <Card className="feature-card text-center">
              <Calendar className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Agendamiento</h3>
              <p className="text-sm text-muted-foreground">Coordina citas automáticamente</p>
            </Card>
            
            <Card className="feature-card text-center">
              <BarChart3 className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Analíticas</h3>
              <p className="text-sm text-muted-foreground">Reportes detallados de conversaciones</p>
            </Card>
            
            <Card className="feature-card text-center">
              <Globe className="h-10 w-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold mb-2">Integración web</h3>
              <p className="text-sm text-muted-foreground">Importa desde URLs automáticamente</p>
            </Card>
            
            <Card className="feature-card text-center">
              <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-bold mb-2">Marca personalizada</h3>
              <p className="text-sm text-muted-foreground">100% tu imagen corporativa</p>
            </Card>
            
            <Card className="feature-card text-center">
              <Smartphone className="h-10 w-10 text-secondary mx-auto mb-4" />
              <h3 className="font-bold mb-2">CRM integrado</h3>
              <p className="text-sm text-muted-foreground">Conecta con tus herramientas</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">Perfecto Para <span className="gradient-text">Todo Tipo de Negocio</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card">
              <div className="text-4xl mb-4">🏪</div>
              <h3 className="text-xl font-bold mb-4">Retail</h3>
              <p className="text-muted-foreground">Consultas de productos, verificación de stock, precios actualizados y recomendaciones personalizadas</p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-4">Construcción</h3>
              <p className="text-muted-foreground">Presupuestos automáticos, especificaciones técnicas, plazos de obra y seguimiento de proyectos</p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-4xl mb-4">💄</div>
              <h3 className="text-xl font-bold mb-4">Servicios</h3>
              <p className="text-muted-foreground">Reserva de citas, consultas especializadas, calificación de clientes y seguimiento personalizado</p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-4xl mb-4">🍕</div>
              <h3 className="text-xl font-bold mb-4">Restaurantes</h3>
              <p className="text-muted-foreground">Reservas automáticas, consultas de menú, pedidos de delivery y recomendaciones gastronómicas</p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-4">Educación</h3>
              <p className="text-muted-foreground">Inscripciones a cursos, información académica, horarios y soporte estudiantil 24/7</p>
            </Card>
            
            <Card className="feature-card">
              <div className="text-4xl mb-4">⚕️</div>
              <h3 className="text-xl font-bold mb-4">Salud</h3>
              <p className="text-muted-foreground">Citas médicas, consultas preliminares, recordatorios de tratamiento y triaje inteligente</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">El Antes y Después de <span className="gradient-text">BotBoxx</span></h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="feature-card border-danger/20">
              <h3 className="text-2xl font-bold mb-6 text-danger">❌ SIN BotBoxx</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Tiempo de respuesta</span>
                  <span className="text-danger font-bold">8 horas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Leads perdidos</span>
                  <span className="text-danger font-bold">60%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Costo por lead</span>
                  <span className="text-danger font-bold">$50</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Disponibilidad</span>
                  <span className="text-danger font-bold">8 hrs/día</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Conversión</span>
                  <span className="text-danger font-bold">2-3%</span>
                </div>
              </div>
            </Card>
            
            <Card className="feature-card border-success/20">
              <h3 className="text-2xl font-bold mb-6 text-success">✅ CON BotBoxx</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Tiempo de respuesta</span>
                  <span className="text-success font-bold">Instantáneo</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Leads perdidos</span>
                  <span className="text-success font-bold">5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Costo por lead</span>
                  <span className="text-success font-bold">$5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Disponibilidad</span>
                  <span className="text-success font-bold">24/7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Conversión</span>
                  <span className="text-success font-bold">12-15%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">Lo Que Dicen Nuestros <span className="gradient-text">Clientes</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "En 2 semanas aumentamos nuestras ventas 250%. El bot responde mejor que mi equipo y trabaja 24/7. Es increíble."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-primary">MC</span>
                </div>
                <div>
                  <p className="font-bold">María Castro</p>
                  <p className="text-sm text-muted-foreground">CEO, TechSolutions</p>
                </div>
              </div>
            </Card>
            
            <Card className="feature-card">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "Bajamos los costos operativos 70% y duplicamos las citas. Nuestros clientes están más satisfechos que nunca."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-secondary">JR</span>
                </div>
                <div>
                  <p className="font-bold">Juan Rodríguez</p>
                  <p className="text-sm text-muted-foreground">Director, MediCare Plus</p>
                </div>
              </div>
            </Card>
            
            <Card className="feature-card">
              <div className="flex items-center mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-warning fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6">
                "La configuración fue súper fácil. En 5 minutos teníamos todo funcionando. ROI instantáneo."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                  <span className="font-bold text-accent">LM</span>
                </div>
                <div>
                  <p className="font-bold">Laura Martínez</p>
                  <p className="text-sm text-muted-foreground">Fundadora, StyleBoutique</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">Preguntas <span className="gradient-text">Frecuentes</span></h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="feature-card">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-bold">¿Necesito conocimientos técnicos?</h3>
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Para nada. BotBoxx está diseñado para que cualquier persona pueda usarlo. Solo pegás tu información, 
                  y el sistema hace todo el trabajo técnico automáticamente.
                </p>
              </details>
            </Card>
            
            <Card className="feature-card">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-bold">¿Cuánto tiempo lleva configurarlo?</h3>
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Literalmente 5 minutos. Subís tu información, la IA se entrena automáticamente, 
                  y ya tenés tu agente funcionando 24/7.
                </p>
              </details>
            </Card>
            
            <Card className="feature-card">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-bold">¿Se integra con mi CRM actual?</h3>
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Sí, BotBoxx se conecta con todos los CRM populares como HubSpot, Salesforce, Pipedrive, 
                  y muchos más. Los leads se transfieren automáticamente.
                </p>
              </details>
            </Card>
            
            <Card className="feature-card">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-bold">¿Qué pasa si tengo problemas?</h3>
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Tenés soporte 24/7 por chat, email y teléfono. Además, cada cliente tiene un 
                  especialista dedicado para setup y optimización.
                </p>
              </details>
            </Card>
            
            <Card className="feature-card">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-bold">¿Puedo personalizar las respuestas?</h3>
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  Absolutamente. Podés personalizar el tono, estilo, respuestas específicas, 
                  y hasta la personalidad del agente para que refleje perfectamente tu marca.
                </p>
              </details>
            </Card>
            
            <Card className="feature-card">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-bold">¿Hay límite de conversaciones?</h3>
                  <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform" />
                </summary>
                <p className="text-muted-foreground mt-4">
                  En el plan gratuito tenés hasta 100 conversaciones. Los planes pagos incluyen 
                  conversaciones ilimitadas y funciones avanzadas.
                </p>
              </details>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-8">Empezá Gratis, <span className="gradient-text">Escalá Cuando Quieras</span></h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="feature-card text-center border-primary/20">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-2xl font-bold mb-4">PRUEBA GRATUITA</h3>
              <div className="text-4xl font-bold text-primary mb-2">$0</div>
              <p className="text-muted-foreground mb-6">Probá todas las funciones sin límites por 14 días</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-8">
                <li>✅ Hasta 100 conversaciones</li>
                <li>✅ 1 agente IA</li>
                <li>✅ Integración básica</li>
                <li>✅ Soporte por email</li>
              </ul>
              <Button className="btn-secondary w-full">EMPEZAR GRATIS</Button>
            </Card>
            
            <Card className="feature-card text-center border-accent/20 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground px-4 py-1">MÁS POPULAR</Badge>
              </div>
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-4">PLAN PRO</h3>
              <div className="text-4xl font-bold text-accent mb-2">$99<span className="text-lg text-muted-foreground">/mes</span></div>
              <p className="text-muted-foreground mb-6">Para empresas que venden en serio</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-8">
                <li>✅ Conversaciones ilimitadas</li>
                <li>✅ 5 agentes IA</li>
                <li>✅ Todas las integraciones</li>
                <li>✅ Analíticas avanzadas</li>
                <li>✅ Soporte prioritario 24/7</li>
                <li>✅ Personalización completa</li>
              </ul>
              <Button className="btn-hero w-full">ELEGIR PRO</Button>
            </Card>
            
            <Card className="feature-card text-center border-secondary/20">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4">ENTERPRISE</h3>
              <div className="text-4xl font-bold text-secondary mb-2">Consultar</div>
              <p className="text-muted-foreground mb-6">Soluciones a medida para grandes empresas</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-8">
                <li>✅ Todo de Plan Pro</li>
                <li>✅ Agentes ilimitados</li>
                <li>✅ API personalizada</li>
                <li>✅ Integración dedicada</li>
                <li>✅ Manager de cuenta</li>
                <li>✅ SLA garantizado</li>
              </ul>
              <Button className="btn-secondary w-full">CONTACTAR VENTAS</Button>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg font-semibold text-success mb-4">
              💰 Garantía: 30 días o te devolvemos el dinero
            </p>
            <p className="text-muted-foreground">
              Sin compromisos, sin contratos largos, cancelá cuando quieras
            </p>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section id="lead-form" className="section-padding">
        <div className="container mx-auto">
          <Card className="feature-card max-w-2xl mx-auto text-center">
            <h2 className="heading-md mb-4">¿Listo Para <span className="gradient-text">Automatizar Tus Ventas?</span></h2>
            <p className="text-muted-foreground mb-8">
              Recibí GRATIS tu agente IA personalizado + Guía de Automatización de Ventas
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  name="name"
                  placeholder="Tu nombre"
                  className="glass-card"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input 
                  name="email"
                  placeholder="Tu email"
                  type="email"
                  className="glass-card"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Input 
                  name="company"
                  placeholder="Tu empresa"
                  className="glass-card"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                />
                <Input 
                  name="phone"
                  placeholder="Teléfono (opcional)"
                  className="glass-card"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-hero w-full text-xl py-6"
              >
                {isSubmitting ? 'ENVIANDO...' : 'CREAR MI AGENTE IA GRATIS'}
                <Bot className="ml-2 h-6 w-6" />
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              🔒 Tus datos están protegidos. No spam, te lo prometemos.
            </p>
          </Card>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="section-padding">
        <div className="container mx-auto">
          <Card className="feature-card max-w-4xl mx-auto text-center border-warning/20">
            <h2 className="heading-md mb-8">⚠️ Oferta Limitada - Solo Este Mes</h2>
            
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              <div className="glass-card p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">{timeLeft.days}</div>
                <div className="text-sm text-muted-foreground">Días</div>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">{timeLeft.hours}</div>
                <div className="text-sm text-muted-foreground">Horas</div>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">{timeLeft.minutes}</div>
                <div className="text-sm text-muted-foreground">Minutos</div>
              </div>
              <div className="glass-card p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">{timeLeft.seconds}</div>
                <div className="text-sm text-muted-foreground">Segundos</div>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <p className="text-lg">🎁 Primeros 100 usuarios obtienen setup gratuito ($500 valor)</p>
              <p className="text-lg">✨ Bonus: Estrategia de marketing digital gratuita</p>
              <p className="text-lg">⚡ Garantía: 30 días o te devolvemos el dinero</p>
            </div>
            
            <Button onClick={scrollToForm} className="btn-hero text-xl px-12 py-6 animate-pulse-glow">
              RECLAMAR OFERTA AHORA
              <Clock className="ml-2 h-6 w-6" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <h2 className="heading-lg mb-8">
            Únete a cientos de empresas que ya <span className="gradient-text">aumentaron sus ventas</span> con BotBoxx
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button onClick={scrollToForm} className="btn-hero text-xl px-12 py-6">
              PROBAR GRATIS AHORA
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button onClick={scrollToForm} className="btn-secondary text-lg px-8 py-4">
              COMENZAR AHORA
              <Play className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-16 border-t border-border pt-8">
            <p className="text-muted-foreground">
              © 2024 BotBoxx. Todos los derechos reservados. 
              <span className="ml-4">🤖 Hecho con IA para potenciar tu negocio</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BotBoxxLanding;