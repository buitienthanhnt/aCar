import {BlockItemType} from '@screens/CodeScreen/AppSetting';

export const index: BlockItemType[] = [
  {
    type: 'TimeHistory',
    title: 'Ngày này năm xưa',
    position: 0,
  },
  {
    type: 'TopNew',
    title: 'Mới nhất',
    position: 1,
    // action: 'openPaperList',
  },
  {
    type: 'TopSearch',
    title: 'Liên kết',
    action: 'openSearch',
    position: 2,
  },
  {
    type: 'Forward',
    title: 'Góc nhìn',
    position: 3,
    // action: 'openDetail',
  },
  {
    type: 'Pro',
    title: ' Bình luận',
    action: 'openPaperList',
    position: 4,
  },
  {
    type: 'Default',
    title: 'Gợi ý',
    position: 5,
  },
  {
    type: 'TimeLine',
    title: 'Sự kiện',
    action: 'openPaperList',
    position: 6,
  },
  {
    type: 'Video',
    title: 'Video',
    action: 'openPaperList',
    position: 7,
  },
  {
    type: 'Popular',
    title: 'Phổ biến',
    action: 'openPaperList',
    position: 8,
  },
  {
    type: 'Images',
    title: 'Hình ảnh',
    action: 'openPaperList',
    position: 9,
  },
  {
    type: 'Chart',
    title: 'Thống kê',
    position: 10,
    // action: 'openDetail',
  },
  {
    type: 'ListWriter',
    title: 'Tác giả',
    position: 11,
    // action: 'openDetail',
  },
  {
    type: 'SearchAll',
    title: 'Tìm kiếm',
    position: 12,
    // action: 'openDetail',
  },
  {
    type: 'Random',
    title: 'Đề xuất',
    action: 'openPaperList',
    position: 13,
  },
];
