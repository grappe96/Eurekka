# frontend 실행 방법

#### 설치 해야할 것

```
Java 8 이상
API 19: Android 4.4(KitKat) 이상
Android Studio 3.6.1 이상
```

#### 환경변수 설정

##### 새로만들기

```
이름: ANDROID_HOME

경로: C:\Users\USER\AppData\Local\Android\Sdk
```

##### Path 편집 -> 새로만들기

```
%ANDROID_HOME%\platform-tools 추가
```

#### 안드로이드 스튜디오 세팅

안드로이드 스튜디오를 연다.

첫 화면에서 Import project(Gradle, Eclipse ADT, etc.)를 선택한다.

프로젝트 경로 -> frontend -> android 폴더를 선택 후 완료한다.

우측 하단에 project sync가 끝날 때까지 기다린다.

File -> Settings -> Appearance & Behavior -> System Settings -> Android SDK로 들어간다.

SDK Platforms에서 Android 11.0 (R) 버전을 선택한다.

SDK Tools 에서 Android SDK Build-Tools 31-rc3, NDK(Side by side), CMake, Android Emulator, Android SDK Platform-Tools, Google Play Licensing Library, Intel x86 Emulator Accelerator (HAXM installer)에 체크되어있는지 확인한다. (안되어있을 시 체크)

apply를 통해 모두 설치하고 완료되면 OK누른다.

File->Settings->Other Settings->Kotlin Compiler 에서 Target JVM version이 1.8인지 확인한다. (아니면 바꿔준다)

#### AVD 설치 방법

AVD Manager를 누른다.

Create Virtual Device...를 누른다.

Pixel로 시작하는 최신 버전 중 맘에 드는 걸 선택한다.

Android 버전은 최신 버전(R)을 선택한다.

Finish를 누른다.

#### 실행방법 (처음 한 번만 수행)

Android Studio를 실행한다.

좌측 하단에 Terminal을 선택하고, cd ..를 통해 프로젝트폴더\frontend 로 이동한다.

아래 명령어를 실행한다.

```c
npm install

npm start
```

리액트 기호가 뜨면 성공이다.

상단의 초록색 실행버튼을 누르고 하단의 빌드가 완료될 때까지 (오래) 기다린다.

AVD가 뜨고 프로젝트가 실행되면 우측 하단의 Logcat을 누르고 검색창에 KeyHash를 검색한다.

이때 나온 해시값을 Kakao Developers > 내 애플리케이션 > 유레까 > 요약 정보 > 플랫폼 > Andoid > 수정 > 키 해시 에 줄바꿈해서 추가한다.



#### 실행방법 (키 해시 등록 후)

##### 1. react-native로 실행

프로젝트폴더\frontend로 이동 후 터미널 창을 두 개 연다. (cmd, git bash 등 아무거나)

아래 명령어를 실행한다.

```c
npm install // git pull 받은 후에만 실행

npm start
```

리액트 기호가 뜨면 다른 창에 아래 명령어를 실행하고 (오래) 기다린다. 이 때 AVD가 자동으로 켜진다.

```c
npm run android
```

##### 2. expo-cli로 실행

프로젝트폴더\frontend로 이동 후 터미널 창을 연다.

아래 명령어를 실행한다.

```c
expo start --web
```

chrome에서 열린 localhost:19002 페이지에서 Run on Android device/emulator를 클릭하고 (오래) 기다린다 .이 때 AVD가 자동으로 켜진다.

- 이 방법으로 하면 web으로도 확인할 수 있고, QR코드 스캔해서 아이폰으로도 볼 수 있다. 모바일 전용 라이브러리의 경우는 웹에서 볼 수 없다.