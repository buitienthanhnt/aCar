const techList: {
    title: string;
    detail: string;
    remoteSource?: {
        type: string;
        url: string;
    }
}[] = [
    {
        title: 'Short Term Fuel Trim (STFT)',
        detail: 'STFT là quá trình hiệu chỉnh ngắn hạn để điều chỉnh lượng nhiên liệu phun vào động cơ. Nó hoạt động dựa trên tín hiệu cảm biến oxy, phản ứng rất nhanh với các thay đổi trong tỷ lệ nhiên liệu/không khí',
        remoteSource: {
            type: 'eac',
            url: 'https://hocngheoto.edu.vn/huong-dan-kiem-tra-ro-le-4-chan',
        },
    },
    {
        title: 'Long Term Fuel Trim (LTFT)',
        detail: 'LTFT là sự hiệu chỉnh dài hạn trong hệ thống nhiên liệu, đáp ứng những thay đổi lớn hơn mà STFT không thể khắc phục ngay lập tức.',
        remoteSource: {
            type: 'eac',
            url: 'https://hocngheoto.edu.vn/huong-dan-kiem-tra-ro-le-4-chan',
        },
    },
    {
        title: 'Bảng tra cứu dung tích dầu nhớt cho 10 dòng xe phổ thông nhất',
        detail: 'Tổng hợp lại bảng thông số dầu nhớt của 10 dòng xe phổ thông nhất hiện nay',
        remoteSource: {
            type: 'eac',
            url: 'https://hocngheoto.edu.vn/bang-tra-cuu-dung-tich-dau-nhot-cho-9-dong-xe-pho-thong-nhat',
        },
    },
    {
        title: 'ECU Điều Khiển Lượng Phun Nhiên Liệu',
        detail: '',
        remoteSource: {
            type: 'eac',
            url: 'https://hocngheoto.edu.vn/ecu-dieu-khien-luong-phun-nhien-lieu',
        },
    },
    {
        title: 'Điều Khiển Không Tải Động Cơ Ô Tô',
        detail: '',
        remoteSource: {
            type: 'eac',
            url: 'https://hocngheoto.edu.vn/dieu-khien-khong-tai-dong-co-o-to',
        },
    },
    {
        title: 'Hướng Dẫn Kiểm Tra Cảm Biến Trục Cam Loại Điện Từ',
        detail: '',
        remoteSource: {
            type: 'eac',
            url: 'https://hocngheoto.edu.vn/huong-dan-kiem-tra-cam-bien-truc-cam-loai-dien-tu',
        },
    },
    {
        title: 'Hướng dẫn đo xung trục cam loại Hall',
        detail: '',
        remoteSource: {
            type: 'eac',
            url: 'https://hocngheoto.edu.vn/huong-dan-do-xung-truc-cam-loai-hall',
        },
    },
    {
        title: 'Cấu Tạo Nguyên Lý Làm Việc Của Hệ Thống Phanh Trên Ô Tô',
        detail: '',
        remoteSource: {
            type: 'eac',
            url: 'https://hocngheoto.edu.vn/cau-tao-nguyen-ly-lam-viec-cua-he-thong-phanh-tren-o-to',
        },
    },
];

export default techList;
