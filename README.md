Pizza Shop E-Commerce

Tam donanımlı bir online pizza sipariş platformu.
Kullanıcıların ürünleri görüntüleyip sepete ekleyebildiği, Stripe ile ödeme yapabildiği ve admin panelinden ürünlerin yönetilebildiği bir full-stack Next.js uygulamasıdır.
Bu repo tek bir Next.js uygulamasından oluşur (pizza sipariş sistemi + admin panel aynı projede).

Özellikler

Kullanıcı Arayüzü (Front)

Ürün listeleme (pizza, salata, içecek vb.)

Ürün detay sayfası

Ürün varyasyonları (boyut, ek malzemeler vs.)

Sepet yönetimi

Kullanıcı profil sayfası

Adres bilgisi kaydetme

Stripe ile ödeme akışı

Sipariş oluşturma ve sipariş detayları

Kullanıcı kayıt – giriş sistemi (Google OAuth destekli)

Admin Paneli

Google OAuth ile giriş

Ürün ekleme / silme / güncelleme

Kategori yönetimi

Kullanıcı yönetimi

Siparişlerin listelenmesi

AWS S3 üzerinden görsel yükleme

Ürün varyasyon özellikleri yönetimi

Menü öğelerini yönetme (fiyat, kategori, görsel)

Teknolojiler:

Bu projede kullanılan temel teknolojiler:

Frontend & Backend

Next.js 13 (App Router)

React 18

TailwindCSS

NextAuth (Google OAuth + Credentials login)

Stripe Checkout

AWS S3 (dosya yükleme)
MongoDB + Mongoose


Yardımcı Araçlar

bcrypt (şifre hashing)

axios

date-fns

micro (Stripe webhook için)

UUID / crypto

Kurulum

git clone https://github.com/brnkrkts/pizza-shop-ecommerce.git

cd pizza-shop-ecommerce

npm install

cp .env.example .env

Gerekli Servisler: 

MongoDB Atlas: Veritabanı için

Google OAuth: Kayıt/giriş sistemi için

AWS S3: Görsel yükleme için

Stripe: Ödeme sistemi için


Çalıştırma
npm run dev

Varsayılan port: http://localhost:3000

Admin Doğrulaması

Admin paneli, NextAuth ile Google OAuth kullanır.

Varsayılan mod (development kolaylığı):

// isAdmin return true;
Bu tüm giriş yapanları admin kabul eder.
Production’da:
return true satırını kaldırın

MongoDB’de users tablosunda admin kullanıcıları belirleyin

Sadece admin olanlar yönetim paneline erişebilir

Stripe Ödeme Sistemi

Kullanıcı ödeme aşamasında Stripe Checkout kullanır.

Webhook sistemi aktif olarak sipariş tamamlandığında:

Sipariş DB’ye kaydedilir


Kullanıcı sepeti temizlenir

Test modunda çalışır - canlı mod için:

Stripe Dashboard

Secret Keys

Signing Secret

gereklidir.

Durum:

Bu proje tamamen öğrenme ve portfolyo amaçlıdır.

Gerçek bir üretim ortamında:

Admin doğrulaması güncellenmeli

Stripe webhook production için ayarlanmalı

Not: Bu proje eğitim ve portfolyo amaçlı geliştirilmiştir.

Bağlantılar, test anahtarları ve servisler güvenlik gereği repoda paylaşılmamaktadır.
