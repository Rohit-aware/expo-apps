import React from "react";
import { MainStackParamList } from "../route/interface";
import { NavigationContainerRef } from "@react-navigation/native";


const navigationRef = React.createRef<NavigationContainerRef<MainStackParamList>>();
export default navigationRef;