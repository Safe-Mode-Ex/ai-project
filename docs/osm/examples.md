# Примеры запросов

## Кафе рядом

```ql
[out:json];
node
  [amenity=cafe]
  (around:500,50.1109,8.6821);
out;
```

## Рестораны + бары

```ql
[out:json];
(
  node[amenity=restaurant];
  node[amenity=bar];
);
out;
```

## Отели в городе

```ql
[out:json];
node
  [tourism=hotel]
  (50.1109,8.6821,50.2,8.8);
out;
```

## Через Nominatim

```
/search?q=restaurants+in+Frankfurt&format=json
```

## Получить координаты города

```
/search?q=Frankfurt&format=json&limit=1
```
