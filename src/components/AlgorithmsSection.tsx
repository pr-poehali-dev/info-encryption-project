import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const AlgorithmsSection = () => {
  return (
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
  );
};

export default AlgorithmsSection;
