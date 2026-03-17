
type SectionItem = {
    id: number;
    label?: string;
    show?: boolean;
    isDelete?: boolean;
    hideBorder?: boolean;
    onPress?: () => void;
};

type SectionProps = {
    title: 'Payments' | 'Other';
    data: Array<SectionItem>;
};

export type { SectionProps, SectionItem };