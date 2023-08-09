from labrary import labrary
from source import source 

def app(pages):
  def Stack(name):
    Stacke="""
              <Stack.Screen
                name='"""+name+"""'
                component={"""+name+"""}
                options={{
                  headerShown: false,
                }}
              />"""
    return Stacke
  def imports(name):
    imports ="import "+ name+" from './screen/"+name+"'\n"
    return imports
  importsl = [imports(a) for a in pages]
  imports = "".join(importsl)
  Stackel=[Stack(a) for a in pages]
  Stacke="".join(Stackel)
  aa ="""
import { KeyboardAvoidingView,StatusBar,Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
"""+imports+"""
export default function App() {
  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <SafeAreaProvider style={styles.container}>
          <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          >
            <Stack.Navigator>"""+Stacke+"""
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  }
});"""
  return aa

def component(mame,para,imports,methods,retus,styles):
  ss ="""import React from "react"
"""+imports+"""

const """+mame+""" = ({"""+para+"""}) => {
"""+methods+"""
  return (
"""+retus+"""
  );
};

const styles = StyleSheet.create({
"""+styles+"""
});

export default """+mame+""";"""
  return ss

def makeImport(ele,compList):
  cont={}
  comp = []
  for j in list(labrary.keys()):
    cont[j] = []
  for i in ele:
    for j in list(labrary.keys()):
      if i in compList:
        cont["comp"].append(i)
      elif i in labrary[j]:
        cont[j].append(i)

  compStr = ["import "+i+" from '../components/"+i+"';"]
  compStr = "\n".join(compStr)
  sss=""
  for i in list(cont.keys()):
    eee = ",".join(cont[i])
    sss+="import {"+eee+"} from '"+i+"';\n"
  sss += compStr
  return sss;

def styleString(name,style={}):
  styles = ["\t\t"+i +":"+ style[i] for i in list(style.keys())]
  stylesstr = "\n".join(styles)
  str = """
  """+name+""":{
    """+stylesstr+"""
  }"""
  return str

def makeElemet(cont,num,methods,styles,imports):
  methods.append(source[cont["Type"]]["methode"])
  styles.append(styleString(cont["stylename"],cont["style"]))
  if cont["Type"] not in imports:
    imports.append(cont["Type"])
  children=""
  if cont["children"] != "":
    for i in cont["children"]:
        children += makeElemet(i,num+1,methods,styles,imports)
  space = "".join(["\t" for i in range(num)])
  if source[cont["Type"]]["Type"] == 2:
    sss= "\n"+space+"<"+cont['Type']+" style={"+cont['stylename']+"} "+source[cont['Type']]["parameter"]+">\n"+children+"\n"+space+"</"+cont["Type"]+">"
  else :
    sss= "\n"+space+"<"+cont["Type"]+" style={"+cont["stylename"]+"} "+source[cont["Type"]]["parameter"]+"/>"
  return sss

def makePage(content,data,compList):
  methods=[]
  styles=[]
  imports = []
  cont = content["cont"]
  children = makeElemet(cont,1,methods,styles,imports)
  method = "".join(methods)
  style = "".join(styles)
  importe =  makeImport(imports,compList)
  page = component(content["name"],",".join(content["parameter"]),importe,method,children,style)
  return page

def main(data):
  pages = [i["name"] for i in data["screen"]]
  compList = [i["name"] for i in data["componets"]]
  apps = app(pages)
  screen={}
  component={}
  for i in data["screen"]:
    screen[i["name"]] = makePage(i,data,compList)
  for i in data["componets"]:
    component[i["name"]] = makePage(i,data,compList)
  return [apps,screen,component]