# Nominatim API — геокодинг

## Поиск

```
https://nominatim.openstreetmap.org/search?q=Berlin&format=json
```

## Параметры

* q — строка поиска
* format=json
* limit=10
* addressdetails=1

## Пример

```
/search?q=Frankfurt&format=json&limit=5
```

## Обратное геокодирование

```
/reverse?lat=50.1109&lon=8.6821&format=json
```

## Важно

* добавляй User-Agent
* соблюдай rate limit
