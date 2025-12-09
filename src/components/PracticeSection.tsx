import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { processCipher, type CipherAlgorithm } from '@/lib/ciphers';

const PracticeSection = () => {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const [encryptedText, setEncryptedText] = useState('');
  const [algorithm, setAlgorithm] = useState<CipherAlgorithm>('caesar');
  const [keyword, setKeyword] = useState('КЛЮЧ');

  const handleEncrypt = useCallback(() => {
    const result = processCipher(algorithm, inputText, true, { shift, keyword });
    setEncryptedText(result);
  }, [algorithm, inputText, shift, keyword]);

  const handleDecrypt = useCallback(() => {
    const result = processCipher(algorithm, inputText, false, { shift, keyword });
    setEncryptedText(result);
  }, [algorithm, inputText, shift, keyword]);

  const algorithmInfo = useMemo(() => {
    const info: Record<CipherAlgorithm, string> = {
      caesar: `Шифр Цезаря со сдвигом ${shift}`,
      vigenere: `Шифр Виженера с ключом "${keyword}"`,
      atbash: 'Атбаш заменяет буквы зеркально: А↔Я, Б↔Ю и т.д.',
      rot13: 'ROT13 — частный случай шифра Цезаря со сдвигом 13',
      morse: 'Азбука Морзе: точки (.) и тире (-). Пробелы между символами, "/" разделяет слова',
      reverse: 'Реверс переворачивает текст задом наперёд'
    };
    return info[algorithm];
  }, [algorithm, shift, keyword]);

  const showShiftControl = algorithm === 'caesar';
  const showKeywordControl = algorithm === 'vigenere';
  const showInfo = ['atbash', 'rot13', 'reverse', 'morse'].includes(algorithm);

  return (
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
            <Select value={algorithm} onValueChange={(val) => setAlgorithm(val as CipherAlgorithm)}>
              <SelectTrigger id="algorithm" className="cyber-border bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-primary/20">
                <SelectItem value="caesar">🔄 Шифр Цезаря</SelectItem>
                <SelectItem value="vigenere">🔑 Шифр Виженера</SelectItem>
                <SelectItem value="atbash">🔃 Атбаш</SelectItem>
                <SelectItem value="rot13">⚡ ROT13</SelectItem>
                <SelectItem value="morse">📡 Азбука Морзе</SelectItem>
                <SelectItem value="reverse">↩️ Реверс</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {showShiftControl && (
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
          )}

          {showKeywordControl && (
            <div className="space-y-2">
              <Label htmlFor="keyword" className="text-primary">Ключевое слово</Label>
              <Input
                id="keyword"
                placeholder="Введите ключевое слово..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="cyber-border bg-muted/50 font-mono"
              />
              <p className="text-xs text-muted-foreground">Используются только буквы, остальное игнорируется</p>
            </div>
          )}

          {showInfo && (
            <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Icon name="Info" className="w-4 h-4 text-primary" />
                {algorithmInfo}
              </p>
            </div>
          )}

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
                Используется алгоритм <strong className="text-primary">{algorithmInfo}</strong>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PracticeSection;
