import {
    CarTwoTone,
    DollarTwoTone,
    HeartTwoTone,
    ScissorOutlined,
    BookTwoTone,
    SkinTwoTone,
    CoffeeOutlined,
    StarTwoTone,
    GiftTwoTone,
    ToolTwoTone,
    HomeTwoTone,
    MobileTwoTone,
    CreditCardTwoTone,
    MailTwoTone,
    RiseOutlined,
    PieChartTwoTone,
    HighlightTwoTone,
    FireTwoTone,
    CrownTwoTone,
    CustomerServiceTwoTone,
    BankTwoTone,
    ShoppingTwoTone,
    PushpinTwoTone,
    CameraTwoTone,
    PlusCircleTwoTone,
    EyeTwoTone,
    EyeInvisibleTwoTone,
    EditOutlined,
    DeleteOutlined,
    CloudUploadOutlined,
    UpCircleTwoTone,
    DownCircleTwoTone,
    CheckOutlined,
    SmileTwoTone,
    FrownTwoTone
} from "@ant-design/icons";

const style = {
    verticalAlign: 1,
    height: "auto",
    width: "auto",
    padding: 2
};

export const getIcon = (teg) => {
    switch (teg) {
        case "car":
            return <CarTwoTone twoToneColor="#6610f2" style={style} />;
        case "masterAccount":
            return <DollarTwoTone twoToneColor="#20c997" style={style} />;
        case "health":
            return <HeartTwoTone twoToneColor="#e83e8c" style={style} />;
        case "beauty":
            return <ScissorOutlined style={style} />;
        case "book":
            return <BookTwoTone twoToneColor="#fd7e14" style={style} />;
        case "cloth":
            return <SkinTwoTone twoToneColor="#6f42c1" style={style} />;
        case "food":
            return <CoffeeOutlined style={style} />;
        case "star":
            return <StarTwoTone twoToneColor="#ffc107" style={style} />;
        case "gift":
            return <GiftTwoTone twoToneColor="#dc3545" style={style} />;
        case "teсhnology":
            return <ToolTwoTone style={style} />;
        case "home":
            return <HomeTwoTone twoToneColor="#D6A206" style={style} />;
        case "phone":
            return <MobileTwoTone style={style} />;
        case "card":
            return <CreditCardTwoTone twoToneColor="#17a2b8" style={style} />;
        case "saving":
            return <MailTwoTone style={style} />;
        case "investments":
            return <RiseOutlined style={style} />;
        case "brush":
            return <HighlightTwoTone style={style} />;
        case "other":
            return <PieChartTwoTone style={style} twoToneColor="#8be3c9" />;
        case "bank":
            return <BankTwoTone style={style} twoToneColor="##D6A206" />;
        case "crown":
            return <CrownTwoTone style={style} twoToneColor="#ffc107" />;
        case "music":
            return (
                <CustomerServiceTwoTone style={style} twoToneColor="#17a2b8" />
            );
        case "fire":
            return <FireTwoTone style={style} twoToneColor="#fd7e14" />;
        case "shop":
            return <ShoppingTwoTone style={style} twoToneColor="#d63384" />;
        case "important":
            return <PushpinTwoTone style={style} twoToneColor="#dc3545" />;
        case "photo":
            return <CameraTwoTone style={style} twoToneColor="#c8a9fa" />;
        case "plus":
            return <PlusCircleTwoTone style={style} twoToneColor="#28a745" />;
        case "eye":
            return <EyeTwoTone style={style} twoToneColor="#3cb1c3" />;
        case "closeEye":
            return <EyeInvisibleTwoTone style={style} twoToneColor="#3cb1c3" />;
        case "edit":
            return <EditOutlined style={style} twoToneColor="#dc3545" />;
        case "load":
            return <CloudUploadOutlined style={style} />;
        case "delete":
            return <DeleteOutlined style={style} />;
        case "asc":
            return <UpCircleTwoTone style={style} twoToneColor="#3cb1c3" />;
        case "desc":
            return <DownCircleTwoTone style={style} twoToneColor="#3cb1c3" />;
        case "check":
            return <CheckOutlined style={style} />;
        case "smile":
            return <SmileTwoTone style={style} twoToneColor="#ffc107" />;
        case "frown":
            return <FrownTwoTone style={style} twoToneColor="#dc3545" />;
        default:
            return null;
    }
};
