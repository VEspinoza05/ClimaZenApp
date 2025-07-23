import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import AntDesign from '@expo/vector-icons/AntDesign';
import IconLabelOptionComponent from "../components/IconLabelOptionComponent";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function App() {
  const [webViewHeight, setWebViewHeight] = useState(100);
  const webViewRef = useRef(null);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: sans-serif;
            margin: 0;
          }
          .spacer {
            height: 800px;
          }
        </style>
      </head>
      <body>
        <h1>Contenido Dinámico</h1>
        <p>Esto es una prueba de WebView con altura automática.</p>
        
        <div class="spacer"></div>
      </body>
    </html>
  `;

  const resizingInjectedJS = `
    function postHeight() {
            const height = document.documentElement.scrollHeight || document.body.scrollHeight;
            window.ReactNativeWebView.postMessage(height.toString());
          }
          window.onload = postHeight;
          window.addEventListener("resize", postHeight);
          setTimeout(postHeight, 500);
  `

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={{ width: "100%", height: webViewHeight }}
        javaScriptEnabled={true}
        injectedJavaScript={resizingInjectedJS}
        onMessage={(event) => {
          const height = Number(event.nativeEvent.data);
          if (!isNaN(height)) {
            setWebViewHeight(height);
          }
        }}
      />
      <TouchableOpacity style={styles.completationButton}>
        <IconLabelOptionComponent
            title={"Marcar como completo"}
            titleStyle={{color: 'white', fontSize: 18}}
            icon={<Ionicons name="checkmark-circle" size={24} color='white' />}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextLessonButton}>
        <IconLabelOptionComponent
          title={"Siguiente leccion"}
          titleStyle={{color: '#6a6a6a', fontSize: 18}}
          icon={<AntDesign name="rightcircle" size={24} color='#6a6a6a' />}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  completationButton: {
    backgroundColor: '#3ca380',
    borderWidth: 2,
    borderColor: '#3ca380',
    borderRadius: 25,
    marginVertical: 8,
    alignItems: 'center',
    paddingVertical: 8,
  },
  nextLessonButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    marginVertical: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6a6a6a',
    paddingVertical: 8,
  }
});
