# Overpass QL — краткий гайд

## Базовый синтаксис

```ql
[out:json];
node["amenity"="cafe"](50.1109,8.6821,50.1200,8.6900);
out;
```

## Основные элементы

* node — точки (POI)
* way — линии/полигоны (дороги, здания)
* relation — сложные структуры

## Фильтры

```ql
["key"="value"]
["amenity"="restaurant"]
["shop"]
```

## По радиусу

```ql
node
  [amenity=cafe]
  (around:500,50.1109,8.6821);
```

## По bounding box

```ql
(50.1109,8.6821,50.1200,8.6900)
```

## Вывод

```ql
out;
out body;
out tags;
```

## Полезные конструкции

### Объединение

```ql
(
  node[amenity=cafe];
  node[amenity=restaurant];
);
out;
```

### Фильтр по имени

```ql
node["name"="Starbucks"];
```
