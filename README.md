# the.weather

#### Optimized For Chromium based browsers (Chrome, Edge...), Firefox browser will have issue on some effects.

#### Project setup

```
npm install

npm run serve    /* Compiles and hot-reloads for development */
```

## 1. STİLLER İLE İLGİLİ AÇIKLAMALAR

### 1.1 `src > sass > base > _base.scss`

Bu .scss dosyasında bütün sayfaya hitap eden CSS deklerasyonlar bulunmaktadır.

```
html {
    font-size: 62.5%;
}
```

Bu deklerasyon kullanıcının browser ayarlarından font-size değiştirmesi durumunda çalışmaya devam etmesi için yazılmıştır.
Burada **px** unit kullanıldığı taktirde kullanıcının browser ayarları override edilir. Kullanılmaz hale gelir ve deklere edilen **px** değeri kullanılır.

> 62.5% ise 10/16 = 0.625 ile bulunmuştur.

- 10 işlem kolaylığı yüzünden tercih edilmiştir.
- 16 ise browserların varsayılan font-size'dır.

### 1.2 "REM" Unit - Root Element Modifier

CSS - HTML ile birlikte kullanıldığında root element HTML olmaktadır.

Bu yüzden html üzerinde deklere edilen `font-size: 62.5%` "rem" biriminin dikkate alacağı değerdir

Yani browser varsayılan ayarları (16px \* 0.625) ile 10px olacaktır.

1.6rem ise 16px anlamına gelmektedir.

`body {font-size: 1.6rem}` ise bu yüzden deklere edilmiştir.

Yani aslında herhangi bir font-size atanmadığında, element body font-size'ı inherit edecektir. (16px);
Browser defaultu. Sayfada kullanılan default font-size 16px olmaya devam edecektir ve kullanıcının browser ayarlarına göre değişecektir.

html elementdeki 10px ise ileride font-size değiştirmemiz gerektiğinde rakamları 16 ile değilde 10 ile çarpmamız daha kolay olacağında deklere edilmiştir.

### 1.3 `src > sass > base > _variables.scss`

Bu dosyada sayfa üzerinde kullanılan stiller değişken / variable olarak saklanmaktadır.

> variable, değerleri taşır deklerasyonunun tamamını taşımaz. (8px, #fff, bold etc...);

> Proje küçük olduğundan dolayı, responsive manager mixine burada yer verilmiştir.
> Proje büyüklüğüne bağlı olarak mixinler için ayrı bir .scss dosyası oluşturulabilir.

mixinler SASS yeniden kullanabilir fonksiyonları olarak adlandırılabilir.
mixinler ile CSS deklerasyonun tamamanını taşır.

### 1.4 Responsive manager

Burada media query için kısa bir keyword olan **responsive** kullanılmıştır.

Bu keyword `@include responsive($mobile) {...}` şeklinde kullanıldığında, 'if' check ile uygun olan media queryi bulup içinde tanımlanan CSS deklerasyonlarını uygular.

Böylece tekrar tekrar '@media ...." şeklinde olan media queryi yazmaya gerek kalmaz ve ayrıca breakpointler için gerekli olan genişliği hatırlamak yerine 'mobile', 'tablet-landscape' gibi keywordler kullanılabilir. (Bu keywordler developer tarafından belirlenir).

### 1.5 Neden 'rem' değil 'em'?

Eğer html elementinde font-size: 62.5% deklerasyonunu kullanmadıysanız. Media querylerde **rem** birimi kullanabilirsiniz.

Ancak html elementimiz (root) 62.5% olduğunda font-size 10px dir. Eğer media query de bu birimi kullanırsak, browser varsayılanı olan 16px e göre değilde, 10px e göre breakpointlerimiz oluşturmuş oluruz.

Bunu engellemek için "body" elementte deklere ettiğimiz font-size: 1.6rem i (16px) i kullanmalıyız.
Bu yüzden 'rem' yerine 'em' kullanırız. Eğer kullanıcı browser ayarlarını 24px yaparsa:

- 'rem' media queryleri 15px (10px \_ 0.625) e göre oluşacaktır.
- 'em' media queryleri ise 24px (10px \_ 0.625 \* 1.6 ) e göre oluşacaktır.

# 2. UYGULAMA ÇALIŞMA PRESİPLERİ

### 2.1 Başlangıç

Proje konumunda 'npm run serve' yazarak development serverı başlatılabilir.

Proje ilk açıldığında `src > main.js` dosyası `public > index.html` dosyasında id'si app olan elemente bir 'Vue instance' oluşturur.

Bu instance `src > App.vue` dosyasını içerir. İlk olarak bu component görünür.

### 2.2 Async Function Nedir?

Javascript yukarıdan aşağıya doğru satır satır kodları execute ederek çalışır, buna senkron çalışma şekli denir.

Ancak HTTP üzerinden bir request'te bulununca veya database'den veri çağırdığımızda, bu veriler anında hazır olmaz. Bu verileri senkron çalışma prensibine göre beklersek, javascript verinin gelmesini bekleyip bir sonraki satıra öyle geçecektir.
Bu bütün uygulamanın, durması anlamına gelmektedir, uygun bir çalışma şekli değildir.

Bu noktada async fonksiyonlar devreye girer, bunlara non-blocking code da denir. Bu kodlar kendisinden sonra gelecek kodları engel olmayacak şekilde çalışmaktadır.

```
console.log("Merhaba");
setTimeout(() => {
  console.log("3 saniye gecikme");
}, "3000");
console.log("Güle Güle");
```

Bu örnek eğer sync çalışma prensiblerine göre çalışsaydı, en son olarak "Güle Güle" kodunu görecektik.
Çünkü uygulama 3 saniye boyunca setTimeout fonksiyonunu bekleyecekti.

Ancak setTimeout bir async fonksiyondur 3 saniye sonra belirtilen callback fonksiyonu çağırır. Bu süre arka planda (Web API üzerinde) sayılmaya devam ederken,
Javascript çalışmaya devam etmektedir.

Bu sebepten dolayı "Güle Güle" kodu aslında 2. sırada yer alacaktır.

```
"Merhaba"
"Güle Güle"

"3 saniye gecikme"
```

### 2.3 API Calls

`src > App.vue` dosyası yüklendiğinde ('mounted' lifecycle hook)

`this.cities.forEach((city) => this.$store.dispatch("fetchWeather", city));` kodunu çağırır.

Bu kod `store > index.js` "state:" property de bulunan "cities" arrayinin içinde iterasyon yapar. (6 şehir bulunmaktadır.)

Her iterasyonda bir şehir adı, `store > index.js` "action:" bulunan `async fetchWeather(..., city)` fonksiyonuna gönderilir ve fonksiyon çalıştırılır.

### `async fetchWeather(context, payload) {...}`

- 'context', vuex içinde bulunan bütün state, getters, mutations, actions ların bulunduğu default bir parametredir.

- 'payload' ise `this.cities.forEach((city) => this.$store.dispatch("fetchWeather", city));` 'city' parametresidir.

Kısacası 'payload' kullanıcı tarafından gönderilirken, 'context' vue tarafından oluşturulan bir parametredir. (Bu isimler kullanıcıya bağlıdır, önemli olan parametre sırasıdır.)

Burada `async` bir fonksiyon içinde:

```
    async fetchWeather(context, payload) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${process.env.VUE_APP_OPEN_WEATHER_MAP_KEY}&units=metric`
      );
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData.message || "Failed to fetch request");
        throw error;
      }
      console.log(responseData);
      ...
      ...
      ...
    }
```

- `fetch()` ile API request yapılır. method belirtilmediğinde varsayılan olarak "GET" requesti gönderilir. Bu HTTP üzerinden başka bir kaynağa (server) yapılan bir request olduğu için zaman alır. Bu yüzden diğer fonksiyonların çalışabilmesi için buradan gelecek cevap beklenir.
  `await` keyword de tam olarak bunu yapmaktadır.
- `fetch()` ile bir `promise` oluşturulur. `promise` sırt çantalı bir taşıyıcıya benzetilebilir, bu taşıyıcı yukarıda belirtilen adrese gideceği sözünü verir ve bu zaman alır. Eğer `await` keyword kullanmazsak kodumuz bize sadece bir `promise` döner yani taşıyıcının söz verdiği anı gösterir.
- Bu requestin tamamlanması `await` ile beklendikten sonra taşıyıcımız artık bir cevaba dönüşmüş olur yani karşıya gidip cevabı alıp kendini dönüştürerek geri döner. ('promise' bir placeholder objeye benzetilebilir.)
- Ancak taşıyıcımızın dönüştüğü obje tam olarak istediğimiz objeyi değil HTTP cevabınının tamamını içerir.
- Bu HTTP cevabına göre basit bir error check yapabiliriz `if (!response.ok)` eğer false ise bu kod block çalıştırılarak, `throw` ile konsola hata gönderilir ve fonksiyon durdurulur (sonraki kodlara devam etmez).
- response.ok: true ise fonksiyon çalışmaya devam eder.
- 'response' objesinde `body` propertysi ihtiyacımız olan veriyi içermektedir. Ancak burası 'ReadableStream' olarak gözükmektedir. Bu verinin küçük chunklar halinde olduğunu belirtmektedir.
- Bu veriyi kullanılabilir bir javascript objesine dönüştürebilmek için `.json()` methodundan faydalanarak veriyi çözümleriz.
- Chunklara ayrılmış bu veriyi çözümlemek zaman aldığından `.json()` methodu da beklenmelidir.
  > API den gelen formata göre bu method (fotoğraf vb.. için) `.blob()` (müzikler vb.. için) `.arrayBuffer()` gibi methodlarla değişebilir.
- Son olarak bu method tamamlandıktan sonra artık uygulamamız içinde kullanılabilir, bir başka bilgisayardan edindiğimiz, javascript objesini elde ederiz.
