import { DimensionValue, ViewStyle } from "react-native";

type CommonStyles = {
  flexOne: ViewStyle;
  flexRow: ViewStyle;
  flexGrow: ViewStyle;
  RowJSB: ViewStyle;
  RowJCAC: ViewStyle;
  RowJSBAC: ViewStyle;
  RowJSAAC: ViewStyle;
  RowJFEAC: ViewStyle;
  RowJSEAC: ViewStyle;
  alignSelfCenter: ViewStyle;
  commonSpace: ViewStyle;
  RowJFSAC: ViewStyle;
  centerJCAC: ViewStyle;
  columnJCAC: ViewStyle;
  columnJFSAC: ViewStyle;
  columnJFS: ViewStyle;
  commonShadow: ViewStyle;
  _flexGrowBg: (value: string) => ViewStyle;
  _horizonatalSpace: (value: DimensionValue) => ViewStyle;
  _flexOneBg: (value: string) => ViewStyle;
  _commonSpace: (value: number) => ViewStyle;
  _commonShadow: (value: {
    shadowColor: string;
    width: number;
    height: number;
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  }) => ViewStyle;
}

const commonStyles: CommonStyles = {
  flexRow: {
    flexDirection: "row",
  },


  flexOne: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },

  _flexGrowBg(value) {
    return {
      flexGrow: 1,
      backgroundColor: value,
    };
  },
  _flexOneBg(value) {
    return {
      flex: 1,
      backgroundColor: value,
    };
  },
  _horizonatalSpace(value) {
    return {
      paddingHorizontal: value,
    };
  },
  RowJCAC: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  columnJCAC: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  columnJFSAC: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  columnJFS: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  centerJCAC: {
    justifyContent: "center",
    alignItems: "center",
  },
  RowJSBAC: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  RowJSEAC: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  RowJSAAC: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  RowJSB: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  RowJFSAC: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  RowJFEAC: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  commonSpace: {
    paddingHorizontal: 20,
  },
  _commonSpace: (value) => {
    return {
      padding: value,
    };
  },
  commonShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0.5,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 1,
  },
  _commonShadow: (value) => {
    return {
      shadowColor: value.shadowColor,
      shadowOffset: {
        width: value.width,
        height: value.height,
      },
      shadowOpacity: value.shadowOpacity,
      shadowRadius: value.shadowRadius,

      elevation: value.elevation,
    };
  },
};

export default commonStyles;