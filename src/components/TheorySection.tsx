import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const TheorySection = () => {
  return (
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
  );
};

export default TheorySection;
