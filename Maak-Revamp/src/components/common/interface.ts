import { KeyboardType, TextStyle, ViewStyle, TextInputProps } from "react-native";
type TextContentType =
    | 'none'
    | 'URL'
    | 'addressCity'
    | 'addressCityAndState'
    | 'addressState'
    | 'countryName'
    | 'creditCardNumber'
    | 'creditCardExpiration'
    | 'creditCardExpirationMonth'
    | 'creditCardExpirationYear'
    | 'creditCardSecurityCode'
    | 'creditCardType'
    | 'creditCardName'
    | 'creditCardGivenName'
    | 'creditCardMiddleName'
    | 'creditCardFamilyName'
    | 'emailAddress'
    | 'familyName'
    | 'fullStreetAddress'
    | 'givenName'
    | 'jobTitle'
    | 'location'
    | 'middleName'
    | 'name'
    | 'namePrefix'
    | 'nameSuffix'
    | 'nickname'
    | 'organizationName'
    | 'postalCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'sublocality'
    | 'telephoneNumber'
    | 'username'
    | 'password'
    | 'newPassword'
    | 'oneTimeCode'
    | 'birthdate'
    | 'birthdateDay'
    | 'birthdateMonth'
    | 'birthdateYear'
    | undefined;

interface InputFieldProps extends TextInputProps {
    label?: string;
    mandatory?: boolean;
    showIcon?: boolean;
    countryCode?: string;
    isMultiLine?: boolean;
    labelStyle?: TextStyle;
    onPressIcon?: () => void;
    removeLeftIcon?: boolean;
    Icon?: React.ElementType;
    keyBoardType?: KeyboardType;
    rightIcon?: React.ElementType;
    textContentType?: TextContentType;
    onChangeText?: (text: string) => void;
    rootStyle?: ViewStyle | Array<ViewStyle>;
    inputTxtStyle?: TextStyle | Array<TextStyle>;
    textContinerStyle?: ViewStyle | Array<ViewStyle>;
};

export type { InputFieldProps };