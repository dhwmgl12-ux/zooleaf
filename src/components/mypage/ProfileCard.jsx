import useToastStore from "../../store/toastStore";
import { useState } from "react";
import Modal from "../common/Modal";
import { formatPhoneNumber } from "../../utils/validation";
import { validateProfile } from "../../utils/profileValidation";
import {
  Card,
  CardHeader,
  HeadingGroup,
  CardTitle,
  IconCircle,
  OutlineButton,
  ProfileList,
  ProfileRow,
  ProfileEditForm,
  ProfileField,
  ProfileLabel,
  ProfileInput,
  ProfileFormError,
  ProfileModalActions,
  ProfileCancelButton,
  ProfileSaveButton,
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

  // 카드에 표시할 정보
  const [profile, setProfile] = useState(previewProfile);

  // 모달 열림 여부와 수정 중인 입력값
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState(previewProfile);
  const [errors, setErrors] = useState({});

  // 현재 정보를 입력창에 넣고 모달 열기
  const openEditModal = () => {
    setForm({ ...profile });
    setErrors({});
    setIsEditOpen(true);
  };

  // 취소하면 입력 중인 내용은 카드에 반영하지 않음
  const closeEditModal = () => {
    setIsEditOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "phone" ? formatPhoneNumber(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    const result = validateProfile(form);

    setForm(result.values);
    setErrors(result.errors);

    const firstError = Object.keys(result.errors)[0];

    if (firstError) {
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }

    // 서버 연결 전: 화면에만 반영
    setProfile(result.values);
    closeEditModal();

    showToast("화면에 반영했습니다. 서버 저장은 아직 연결 전입니다.");
  };

  // 같은 구조의 정보를 배열로 만들어 반복 출력
  const rows = [
    {
      label: "이름",
      value: profile.name ? `${profile.name}님` : "미등록",
    },
    {
      label: "이메일",
      value: profile.id ?? "미등록",
    },
    {
      label: "전화번호",
      value: profile.phone ?? "미등록",
    },
    {
      label: "생년월일",
      value: profile.birthDate?.replaceAll("-", ".") ?? "미등록",
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

        <OutlineButton type="button" onClick={openEditModal}>
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
      <Modal isOpen={isEditOpen} onClose={closeEditModal} title="회원정보 수정">
        <ProfileEditForm
          onSubmit={handleSave}
          aria-label="회원정보 수정"
          noValidate
        >
          <ProfileField>
            <ProfileLabel htmlFor="profile-name">이름</ProfileLabel>

            <ProfileInput
              id="profile-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              maxLength={50}
              required
            />
            {errors.name && (
              <ProfileFormError role="alert">{errors.name}</ProfileFormError>
            )}
          </ProfileField>

          <ProfileField>
            <ProfileLabel htmlFor="profile-phone">전화번호</ProfileLabel>

            <ProfileInput
              id="profile-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
              pattern="01[016789]-[0-9]{3,4}-[0-9]{4}"
              title="010-1234-5678 형식으로 입력해주세요."
              maxLength={13}
              required
            />
            {errors.phone && (
              <ProfileFormError role="alert">{errors.phone}</ProfileFormError>
            )}
          </ProfileField>

          <ProfileField>
            <ProfileLabel htmlFor="profile-birth-date">생년월일</ProfileLabel>

            <ProfileInput
              id="profile-birth-date"
              name="birthDate"
              type="date"
              autoComplete="bday"
              value={form.birthDate}
              onChange={handleChange}
              max={[
                new Date().getFullYear(),
                String(new Date().getMonth() + 1).padStart(2, "0"),
                String(new Date().getDate()).padStart(2, "0"),
              ].join("-")}
              required
            />
            {errors.birthDate && (
              <ProfileFormError role="alert">
                {errors.birthDate}
              </ProfileFormError>
            )}
          </ProfileField>

          <ProfileModalActions>
            <ProfileCancelButton type="button" onClick={closeEditModal}>
              취소
            </ProfileCancelButton>

            <ProfileSaveButton type="submit">저장하기</ProfileSaveButton>
          </ProfileModalActions>
        </ProfileEditForm>
      </Modal>
    </Card>
  );
}
