import useToastStore from "../../store/toastStore";
import {
  Card,
  CardHeader,
  HeadingGroup,
  CardTitle,
  ItemTitle,
  IconCircle,
  OutlineButton,
  AddressList,
  AddressBox,
  DefaultBadge,
  AddressTop,
  ButtonGroup,
  AddressDetails,
} from "../../pages/Mypage.styles";

// 화면 확인용 데이터
const previewAddresses = [
  {
    addressId: 1,
    label: "집",
    recipientName: "고길동",
    phone: "010-0000-0000",
    address: "서울특별시 성동구 왕십리로 100",
    detailAddress: "1203호",
    isDefault: true,
  },
  {
    addressId: 2,
    label: "회사",
    recipientName: "고길동",
    phone: "010-0000-0000",
    address: "경기도 성남시 분당구 판교로 255",
    detailAddress: "5층",
    isDefault: false,
  },
];

export default function AddressSection() {
  const showToast = useToastStore((state) => state.showToast);

  return (
    <Card>
      <CardHeader>
        <HeadingGroup>
          <IconCircle aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            >
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </IconCircle>

          <div>
            <CardTitle>배송지 관리</CardTitle>
            <p>배송지를 등록하고 관리할 수 있습니다.</p>
          </div>
        </HeadingGroup>

        <OutlineButton
          type="button"
          onClick={() => showToast("배송지 추가 기능은 준비 중입니다.")}
        >
          + 새 배송지 추가
        </OutlineButton>
      </CardHeader>

      <AddressList>
        {previewAddresses.map((address) => (
          <AddressBox key={address.addressId}>
            {address.isDefault && <DefaultBadge>기본배송지</DefaultBadge>}

            <AddressTop>
              <ItemTitle>{address.label}</ItemTitle>

              <ButtonGroup>
                <OutlineButton
                  type="button"
                  aria-label={`${address.label} 배송지 수정`}
                  onClick={() => showToast("배송지 수정 기능은 준비 중입니다.")}
                >
                  수정
                </OutlineButton>

                <OutlineButton
                  type="button"
                  aria-label={`${address.label} 배송지 삭제`}
                  onClick={() => showToast("배송지 삭제 기능은 준비 중입니다.")}
                >
                  삭제
                </OutlineButton>
              </ButtonGroup>
            </AddressTop>

            <AddressDetails>
              <div>
                <dt>수령인</dt>
                <dd>{address.recipientName}</dd>
              </div>

              <div>
                <dt>연락처</dt>
                <dd>{address.phone}</dd>
              </div>

              <div>
                <dt>주소</dt>
                <dd>
                  {[address.address, address.detailAddress]
                    .filter(Boolean)
                    .join(", ")}
                </dd>
              </div>
            </AddressDetails>
          </AddressBox>
        ))}
      </AddressList>
    </Card>
  );
}
