import { lazy, Suspense } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import MatrixRain from '@/components/MatrixRain';

const TheorySection = lazy(() => import('@/components/TheorySection'));
const AlgorithmsSection = lazy(() => import('@/components/AlgorithmsSection'));
const PracticeSection = lazy(() => import('@/components/PracticeSection'));

const LoadingCard = () => (
  <Card className="cyber-border bg-card/50 backdrop-blur-sm">
    <CardContent className="p-12 text-center">
      <div className="animate-pulse text-primary">Загрузка...</div>
    </CardContent>
  </Card>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <MatrixRain />

      <div className="relative z-10">
        <header className="border-b border-primary/20 backdrop-blur-sm bg-background/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Lock" className="w-8 h-8 text-primary matrix-text" />
                <h1 className="text-3xl font-bold matrix-text">SHIFRPROJ.EDUC</h1>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                v1.0.0
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Tabs defaultValue="home" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm border border-primary/20 sticky top-24 z-40">
              <TabsTrigger value="home" className="data-[state=active]:matrix-text data-[state=active]:neon-glow">
                <Icon name="Home" className="w-4 h-4 mr-2" />
                Главная
              </TabsTrigger>
              <TabsTrigger value="theory" className="data-[state=active]:matrix-text data-[state=active]:neon-glow">
                <Icon name="BookOpen" className="w-4 h-4 mr-2" />
                Теория
              </TabsTrigger>
              <TabsTrigger value="algorithms" className="data-[state=active]:matrix-text data-[state=active]:neon-glow">
                <Icon name="Binary" className="w-4 h-4 mr-2" />
                Алгоритмы
              </TabsTrigger>
              <TabsTrigger value="practice" className="data-[state=active]:matrix-text data-[state=active]:neon-glow">
                <Icon name="Terminal" className="w-4 h-4 mr-2" />
                Практика
              </TabsTrigger>
              <TabsTrigger value="examples" className="data-[state=active]:matrix-text data-[state=active]:neon-glow">
                <Icon name="FileCode" className="w-4 h-4 mr-2" />
                Примеры
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="space-y-6">
              <Card className="cyber-border bg-card/50 backdrop-blur-sm animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-4xl matrix-text flex items-center gap-3">
                    <Icon name="Shield" className="w-10 h-10" />
                    SHIFRPROJ.EDUC
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    Изучайте криптографию через интерактивные инструменты
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-foreground/90 leading-relaxed">
                    Добро пожаловать в образовательный проект по криптографии! Здесь вы изучите основы шифрования, 
                    познакомитесь с классическими и современными алгоритмами, а также сможете попрактиковаться 
                    в реальном времени с интерактивным калькулятором.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card className="bg-muted/50 border-primary/20 hover:border-primary/50 transition-all hover-scale">
                      <CardHeader>
                        <Icon name="GraduationCap" className="w-8 h-8 text-secondary mb-2" />
                        <CardTitle className="text-lg">Обучение</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Теоретические основы криптографии и история развития
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/50 border-primary/20 hover:border-primary/50 transition-all hover-scale">
                      <CardHeader>
                        <Icon name="Code2" className="w-8 h-8 text-accent mb-2" />
                        <CardTitle className="text-lg">Алгоритмы</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Изучение различных методов шифрования данных
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/50 border-primary/20 hover:border-primary/50 transition-all hover-scale">
                      <CardHeader>
                        <Icon name="Zap" className="w-8 h-8 text-primary mb-2" />
                        <CardTitle className="text-lg">Практика</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Живое шифрование и дешифрование текста
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="theory" className="space-y-6">
              <Suspense fallback={<LoadingCard />}>
                <TheorySection />
              </Suspense>
            </TabsContent>

            <TabsContent value="algorithms" className="space-y-6">
              <Suspense fallback={<LoadingCard />}>
                <AlgorithmsSection />
              </Suspense>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <Suspense fallback={<LoadingCard />}>
                <PracticeSection />
              </Suspense>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card className="cyber-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl matrix-text flex items-center gap-3">
                    <Icon name="FileCode" className="w-8 h-8" />
                    Практические примеры
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="bg-muted/50 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary">
                        <Icon name="MessageSquare" className="w-5 h-5" />
                        Пример 1: Секретное сообщение
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-background/70 rounded font-mono text-sm">
                        <p className="text-muted-foreground mb-1">Задача: зашифровать "ВСТРЕЧА В ПОЛНОЧЬ"</p>
                        <p className="text-foreground">Алгоритм: Шифр Цезаря, сдвиг 5</p>
                        <p className="text-primary mt-2">Решение: ГХЧЯЁВЙ Г УФПСНВЭ</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Попробуйте расшифровать это сообщение в калькуляторе!
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-secondary">
                        <Icon name="Shield" className="w-5 h-5" />
                        Пример 2: Защита пароля
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-background/70 rounded font-mono text-sm">
                        <p className="text-muted-foreground mb-1">Задача: сохранить пароль "PASSWORD123"</p>
                        <p className="text-foreground">Алгоритм: Шифр Цезаря, сдвиг 13</p>
                        <p className="text-secondary mt-2">Результат: CNFFJBEQ123</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Базовый способ обфускации данных (не используйте для реальных паролей!)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50 border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-accent">
                        <Icon name="Mail" className="w-5 h-5" />
                        Пример 3: Историческое письмо
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 bg-background/70 rounded font-mono text-sm">
                        <p className="text-muted-foreground mb-1">Юлий Цезарь отправлял письма:</p>
                        <p className="text-foreground">"VENI VIDI VICI" (пришёл, увидел, победил)</p>
                        <p className="text-accent mt-2">Зашифровано (сдвиг 3): "YHQL YLGL YLFL"</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Именно так Цезарь защищал военную переписку от врагов
                      </p>
                    </CardContent>
                  </Card>

                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                      <Icon name="Lightbulb" className="w-5 h-5" />
                      Совет
                    </h4>
                    <p className="text-sm text-foreground/90">
                      Попробуйте зашифровать своё имя разными сдвигами и посмотрите, как меняется результат. 
                      Чем больше сдвиг, тем сложнее угадать исходный текст!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <footer className="border-t border-primary/20 backdrop-blur-sm bg-background/50 mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm text-muted-foreground">
                  © 2024 SHIFRPROJ.EDUC — Образовательный проект по криптографии
                </p>
                <p className="text-sm text-foreground/80">
                  Создатель: <span className="font-semibold text-primary">Тулинов Владимир Андреевич</span>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="border-primary text-primary">
                  <Icon name="Code2" className="w-3 h-3 mr-1" />
                  Информатика
                </Badge>
                <Badge variant="outline" className="border-secondary text-secondary">
                  <Icon name="GraduationCap" className="w-3 h-3 mr-1" />
                  Обучение
                </Badge>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;