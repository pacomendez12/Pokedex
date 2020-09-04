# Pokedex

Simple Pokedex app.

For Running it just clone the repository.
```
    $ cd Pokedex
    $ yarn install
```

## Running

```
  $ yarn start
  $ yarn (android|ios)
```

Error while building for Android: (create debug keystore)
cd android/app
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
