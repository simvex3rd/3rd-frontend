# Icons

PNG 아이콘 저장소입니다.

## 파일 규칙

- **파일명**: kebab-case (예: `menu.png`, `close-button.png`)
- **포맷**: PNG (투명 배경)
- **권장 크기**: 24×24, 32×32, 48×48 (또는 더 큰 크기)
- **최적화**: 파일 크기 최소화 (TinyPNG 등 사용)

## 사용 방법

```tsx
import { Icon } from "@/components/common/Icon";

// 기본 사용
<Icon name="menu" />

// 크기 조절
<Icon name="close" size={32} />

// 스타일링
<Icon name="search" size={20} className="opacity-50" />
```

## 디렉토리 구조 (권장)

```
public/icons/
├── navigation/
│   ├── menu.png
│   ├── close.png
│   └── back.png
├── actions/
│   ├── edit.png
│   ├── delete.png
│   └── save.png
└── ui/
    ├── chevron-down.png
    ├── chevron-up.png
    └── search.png
```

카테고리별로 폴더를 나누면 관리가 쉽습니다.
