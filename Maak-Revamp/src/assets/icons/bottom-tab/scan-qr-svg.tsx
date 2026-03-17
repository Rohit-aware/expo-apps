import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { ownSvgProps } from "../interface";
import { Colors } from "../../../constants";

const ScanQRSvg = (props: ownSvgProps) => (
    <Svg
        width={40}
        height={46}
        viewBox="0 0 40 46"
        fill="none"
        {...props}
    >
        <Path
            opacity={0.05}
            d="M18 1.1547C19.2376 0.440169 20.7624 0.440169 22 1.1547L37.9186 10.3453C39.1562 11.0598 39.9186 12.3803 39.9186 13.8094V32.1906C39.9186 33.6197 39.1562 34.9402 37.9186 35.6547L22 44.8453C20.7624 45.5598 19.2376 45.5598 18 44.8453L2.08142 35.6547C0.843811 34.9402 0.0814152 33.6197 0.0814152 32.1906V13.8094C0.0814152 12.3803 0.843811 11.0598 2.08142 10.3453L18 1.1547Z"
            fill={Colors.primaryColor}
        />
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 8H5V18L6.66667 16.3333V9.66667H13.3333L15 8ZM5 38V28L6.66667 29.6667V36.3333H13.3333L15 38H5ZM25 8L26.6667 9.66667H33.3333V16.3333L35 18V8H25ZM33.3333 29.6667L35 28V38H25L26.6667 36.3333H33.3333V29.6667ZM11.6667 14.6667H18.3333V21.3333H11.6667V14.6667ZM11.6667 24.6667H18.3333V31.3333H11.6667V24.6667ZM28.3333 14.6667H21.6667V21.3333H28.3333V14.6667ZM21.6667 24.6667H28.3333V31.3333H21.6667V24.6667Z"
            fill={Colors.primaryColor}
        />
    </Svg>
);
export default ScanQRSvg;
