import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const [encryptedText, setEncryptedText] = useState('');
  const [algorithm, setAlgorithm] = useState('caesar');

  const caesarCipher = (text: string, shift: number, encrypt: boolean = true) => {
    const s = encrypt ? shift : -shift;
    return text
      .split('')
      .map(char => {
        if (char.match(/[а-яё]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = char === char.toUpperCase();
          const base = isUpperCase ? 1040 : 1072;
          const alphabetSize = char.toLowerCase() === 'ё' ? 33 : 32;
          const newCode = ((code - base + s) % alphabetSize + alphabetSize) % alphabetSize + base;
          return String.fromCharCode(newCode);
        } else if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = char === char.toUpperCase();
          const base = isUpperCase ? 65 : 97;
          const newCode = ((code - base + s) % 26 + 26) % 26 + base;
          return String.fromCharCode(newCode);
        }
        return char;
      })
      .join('');
  };

  const handleEncrypt = () => {
    if (algorithm === 'caesar') {
      setEncryptedText(caesarCipher(inputText, shift, true));
    }
  };

  const handleDecrypt = () => {
    if (algorithm === 'caesar') {
      setEncryptedText(caesarCipher(inputText, shift, false));
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `matrixRain ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Array.from({ length: 20 }, () => 
              Math.random() > 0.5 ? String.fromCharCode(48 + Math.floor(Math.random() * 10)) : String.fromCharCode(65 + Math.floor(Math.random() * 26))
            ).join('\n')}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        <header className="border-b border-primary/20 backdrop-blur-sm bg-background/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon name="Lock" className="w-8 h-8 text-primary matrix-text" />
                <h1 className="text-3xl font-bold matrix-text">CRYPTO.EDU</h1>
              </div>
              <Badge variant="outline" className="border-primary text-primary">
                v1.0.0
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Tabs defaultValue="home" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm border border-primary/20">
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
                    Шифрование информации
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
              <Card className="cyber-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl matrix-text flex items-center gap-3">
                    <Icon name="BookOpen" className="w-8 h-8" />
                    Теория криптографии
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
                      <h3 className="text-xl font-semibold text-secondary mb-2 flex items-center gap-2">
                        <Icon name="Info" className="w-5 h-5" />
                        Что такое криптография?
                      </h3>
                      <p className="text-foreground/90">
                        Криптография — наука о методах обеспечения конфиденциальности и аутентичности информации. 
                        Она используется для защиты данных от несанкционированного доступа путём преобразования 
                        исходного текста в зашифрованный вид.
                      </p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
                      <h3 className="text-xl font-semibold text-secondary mb-2 flex items-center gap-2">
                        <Icon name="History" className="w-5 h-5" />
                        История развития
                      </h3>
                      <ul className="space-y-2 text-foreground/90">
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">►</span>
                          <span><strong>Античность:</strong> Шифр Цезаря использовался для военной переписки</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">►</span>
                          <span><strong>XVI век:</strong> Изобретение шифра Виженера - полиалфавитного метода</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">►</span>
                          <span><strong>XX век:</strong> Появление машин Enigma и разработка компьютерной криптографии</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary font-bold mt-1">►</span>
                          <span><strong>1970-е:</strong> Создание RSA - первой системы с открытым ключом</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg border border-primary/20">
                      <h3 className="text-xl font-semibold text-secondary mb-2 flex items-center gap-2">
                        <Icon name="Key" className="w-5 h-5" />
                        Основные термины
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="p-3 bg-background/50 rounded border border-primary/10">
                          <p className="font-semibold text-primary">Шифрование</p>
                          <p className="text-sm text-muted-foreground">Преобразование исходного текста в зашифрованный</p>
                        </div>
                        <div className="p-3 bg-background/50 rounded border border-primary/10">
                          <p className="font-semibold text-primary">Дешифрование</p>
                          <p className="text-sm text-muted-foreground">Обратное преобразование для получения исходного текста</p>
                        </div>
                        <div className="p-3 bg-background/50 rounded border border-primary/10">
                          <p className="font-semibold text-primary">Ключ</p>
                          <p className="text-sm text-muted-foreground">Секретная информация для шифрования/дешифрования</p>
                        </div>
                        <div className="p-3 bg-background/50 rounded border border-primary/10">
                          <p className="font-semibold text-primary">Криптоанализ</p>
                          <p className="text-sm text-muted-foreground">Наука о взломе шифров</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="algorithms" className="space-y-6">
              <Card className="cyber-border bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-3xl matrix-text flex items-center gap-3">
                    <Icon name="Binary" className="w-8 h-8" />
                    Алгоритмы шифрования
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Card className="bg-muted/50 border-secondary/40">
                    <CardHeader>
                      <CardTitle className="text-secondary flex items-center gap-2">
                        <Icon name="RotateCw" className="w-6 h-6" />
                        Шифр Цезаря (Caesar Cipher)
                      </CardTitle>
                      <Badge variant="outline" className="w-fit">Классический</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-foreground/90">
                        Один из древнейших методов шифрования, основанный на сдвиге букв алфавита на фиксированное число позиций.
                      </p>
                      <div className="p-3 bg-background/70 rounded font-mono text-sm border border-primary/20">
                        <p className="text-muted-foreground">Пример: сдвиг на 3</p>
                        <p className="text-primary">Исходный: ПРИВЕТ</p>
                        <p className="text-secondary">Зашифрованный: ТУЛДЗХ</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Применение:</strong> Обучение основам криптографии, простые головоломки
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50 border-accent/40">
                    <CardHeader>
                      <CardTitle className="text-accent flex items-center gap-2">
                        <Icon name="Grid3x3" className="w-6 h-6" />
                        Шифр Виженера (Vigenère Cipher)
                      </CardTitle>
                      <Badge variant="outline" className="w-fit">Полиалфавитный</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-foreground/90">
                        Усовершенствованный метод, использующий ключевое слово для различных сдвигов на каждой позиции.
                      </p>
                      <div className="p-3 bg-background/70 rounded font-mono text-sm border border-primary/20">
                        <p className="text-muted-foreground">Ключ: КЛЮЧ</p>
                        <p className="text-primary">Исходный: СЕКРЕТ</p>
                        <p className="text-accent">Зашифрованный: ЪММЦЖХ</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Применение:</strong> Военная переписка в прошлом, образовательные цели
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50 border-primary/40">
                    <CardHeader>
                      <CardTitle className="text-primary flex items-center gap-2">
                        <Icon name="KeyRound" className="w-6 h-6" />
                        RSA (Rivest–Shamir–Adleman)
                      </CardTitle>
                      <Badge variant="outline" className="w-fit">Асимметричный</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-foreground/90">
                        Современный алгоритм с открытым ключом, основанный на сложности факторизации больших чисел.
                      </p>
                      <div className="p-3 bg-background/70 rounded font-mono text-sm border border-primary/20">
                        <p className="text-muted-foreground">Два ключа:</p>
                        <p className="text-primary">Открытый: для шифрования</p>
                        <p className="text-secondary">Закрытый: для дешифрования</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Применение:</strong> HTTPS, цифровые подписи, защищенная передача данных
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6">
              <Card className="cyber-border bg-card/50 backdrop-blur-sm pulse-glow">
                <CardHeader>
                  <CardTitle className="text-3xl matrix-text flex items-center gap-3">
                    <Icon name="Terminal" className="w-8 h-8" />
                    Интерактивный калькулятор
                  </CardTitle>
                  <CardDescription>Шифруйте и дешифруйте текст в реальном времени</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="algorithm" className="text-primary">Алгоритм шифрования</Label>
                      <Select value={algorithm} onValueChange={setAlgorithm}>
                        <SelectTrigger id="algorithm" className="cyber-border bg-muted/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-primary/20">
                          <SelectItem value="caesar">Шифр Цезаря</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shift" className="text-primary">Сдвиг (ключ): {shift}</Label>
                      <Input
                        id="shift"
                        type="range"
                        min="1"
                        max="25"
                        value={shift}
                        onChange={(e) => setShift(Number(e.target.value))}
                        className="cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="input" className="text-primary">Исходный текст</Label>
                      <Textarea
                        id="input"
                        placeholder="Введите текст для шифрования..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="cyber-border bg-muted/50 font-mono min-h-[120px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleEncrypt} 
                        className="flex-1 bg-secondary hover:bg-secondary/80 neon-glow"
                        disabled={!inputText}
                      >
                        <Icon name="Lock" className="w-4 h-4 mr-2" />
                        Зашифровать
                      </Button>
                      <Button 
                        onClick={handleDecrypt} 
                        className="flex-1 bg-accent hover:bg-accent/80"
                        disabled={!inputText}
                      >
                        <Icon name="Unlock" className="w-4 h-4 mr-2" />
                        Дешифровать
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="output" className="text-primary">Результат</Label>
                      <Textarea
                        id="output"
                        value={encryptedText}
                        readOnly
                        className="cyber-border bg-background/70 font-mono min-h-[120px] matrix-text"
                        placeholder="Результат появится здесь..."
                      />
                    </div>

                    {encryptedText && (
                      <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg animate-fade-in">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="Info" className="w-4 h-4 text-primary" />
                          Используется алгоритм <strong className="text-primary">Шифр Цезаря</strong> со сдвигом <strong className="text-primary">{shift}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
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
              <p className="text-sm text-muted-foreground">
                © 2024 CRYPTO.EDU — Образовательный проект по криптографии
              </p>
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
