import useToastStore from "../../store/toastStore";
import {
  Card,
  CardHeader,
  HeadingGroup,
  CardTitle,
  IconCircle,
  OutlineButton,
  ProfileList,
  ProfileRow,
} from "../../pages/Mypage.styles";

// 화면 확인용 데이터
const previewProfile = {
  name: "고길동",
  id: "example@zooleaf.com",
  phone: "010-0000-0000",
  birthDate: "1999-09-09",
};

export default function ProfileCard() {
  const showToast = useToastStore((state) => state.showToast);

  // 같은 구조의 정보를 배열로 만들어 반복 출력
  const rows = [
    {
      label: "이름",
      value: previewProfile.name ? `${previewProfile.name}님` : "미등록",
    },
    {
      label: "이메일",
      value: previewProfile.id ?? "미등록",
    },
    {
      label: "전화번호",
      value: previewProfile.phone ?? "미등록",
    },
    {
      label: "생년월일",
      value: previewProfile.birthDate?.replaceAll("-", ".") ?? "미등록",
    },
  ];

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
              strokeLinecap="round"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
            </svg>
          </IconCircle>

          <div>
            <CardTitle>회원정보</CardTitle>
            <p>기본 정보를 확인하고 수정할 수 있습니다.</p>
          </div>
        </HeadingGroup>

        <OutlineButton
          type="button"
          onClick={() => showToast("회원정보 수정 기능은 준비 중입니다.")}
        >
          수정하기
        </OutlineButton>
      </CardHeader>

      <ProfileList>
        {rows.map(({ label, value }) => (
          <ProfileRow key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </ProfileRow>
        ))}
      </ProfileList>
    </Card>
  );
}
