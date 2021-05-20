# frontend 실행 방법

#### 요구되는 버전

```
Java 8 이상
API 19: Android 4.4(KitKat) 이상
Android Studio 3.6.1 이상
```

#### 환경변수 설정

##### 새로만들기

```
이름: ANDROID_HOME

경로: C:\Users\{사용지}\AppData\Local\Android\Sdk
```

##### Path 편집 -> 새로만들기

```
%ANDROID_HOME%\platform-tools 추가
```

#### 안드로이드 스튜디오 세팅

<img src="images/1.jpg" align=center>

- Import project(Gradle, Eclipse ADT, etc.) 선택

- S04P31A404 -> frontend -> android 폴더 선택

- 우측 하단에 project sync 끝날 때까지 대기

- File -> Settings -> Appearance & Behavior -> System Settings -> Android SDK 선택

<img src="images/2.jpg" align=center>

- SDK Platforms에서 Android 11.0 (R) 버전 선택

<img src="images/3.jpg" align=center>

- SDK Tools 체크 확인 목록
  - Android SDK Build-Tools 31-rc3, NDK(Side by side)
  - CMake
  - Android Emulator
  - Android SDK Platform-Tools
  - Google Play Licensing Library
  - Intel x86 Emulator Accelerator (HAXM installer)

- apply를 통해 설치 후 완료되면 OK

<img src="images/4.jpg" align=center>

- File->Settings->Other Settings->Kotlin Compiler에서 Target JVM version 1.8인지 확인

#### AVD 설치 방법

<img src="images/5.jpg" align=center>

- AVD Manager -> Create Virtual Device...

<img src="images/6.jpg" align=center>

- Pixel로 시작하는 최신 버전 중 선택

<img src="images/7.jpg" align=center>

- Android 버전은 최신 버전(R) 선택

<img src="images/14.jpg" align=center>

- Show Advanced Settings 선택

<img src="images/15.jpg" align=center>

- Camera -> Front, Back을 Webcam으로 변경

<img src="images/8.jpg" align=center>

- Finish



#### 실행방법

##### 1. react-native로 실행

S04P31A404\frontend로 이동 후 터미널 창을 두 개 open

아래 명령어를 실행

- 첫번째 창

```c
npm install

npm start
```

- 두번째 창

```c
npm run android
```
