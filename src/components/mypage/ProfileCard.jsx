import useToastStore from "../../store/toastStore";
import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import { formatPhoneNumber, formatBirthDate } from "../../utils/validation";
import { validateProfile } from "../../utils/profileValidation";
import { getMe, updateMe } from "../../api/authApi";
import useAuthStore from "../../store/authStore";

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
const emptyProfile = {
  name: "",
  id: "",
  phone: "",
  birthDate: "",
};

export default function ProfileCard() {
  const showToast = useToastStore((state) => state.showToast);

  // 카드에 표시할 회원정보
  const [profile, setProfile] = useState(emptyProfile);

  // 수정 모달 상태
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState(emptyProfile);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  // 회원정보 조회 상태
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchProfile = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const result = await getMe();
        const data = result.data;

        if (!data || typeof data !== "object") {
          throw new Error("회원정보 응답 형식을 확인해 주세요.");
        }

        if (ignore) return;

        setProfile({
          name: data.name ?? "",
          id: data.id ?? "",
          phone: formatPhoneNumber(data.phone ?? ""),
          birthDate: formatBirthDate(data.birthDate ?? ""),
        });
      } catch (error) {
        if (!ignore) {
          setLoadError(error.message || "회원정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      ignore = true;
    };
  }, [retryCount]);

  // 현재 정보를 입력창에 넣고 모달 열기
  // 현재 정보를 입력창에 넣고 모달 열기
  const openEditModal = () => {
    if (isLoading || loadError || isSaving) return;

    setForm({
      ...profile,
      birthDate: formatBirthDate(profile.birthDate ?? ""),
    });
    setErrors({});
    setSaveError("");
    setIsEditOpen(true);
  };

  // 저장 중에는 모달을 닫지 않음
  const closeEditModal = () => {
    if (isSaving) return;

    setIsEditOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "phone") nextValue = formatPhoneNumber(value);
    if (name === "birthDate") nextValue = formatBirthDate(value);

    setForm((prev) => ({
      ...prev,
      [name]: nextValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (isSaving) return;

    const result = validateProfile(form);

    setForm(result.values);
    setErrors(result.errors);
    setSaveError("");

    const firstError = Object.keys(result.errors)[0];

    if (firstError) {
      event.currentTarget.elements.namedItem(firstError)?.focus();
      return;
    }

    setIsSaving(true);

    try {
      const response = await updateMe({
        name: result.values.name,
        phone: result.values.phone,
        birthDate: result.values.birthDate,
      });

      const data = response.data;

      if (!data || typeof data !== "object") {
        throw new Error(
          "저장 응답을 확인하지 못했습니다. 새로고침 후 회원정보를 확인해 주세요.",
        );
      }

      const updatedProfile = {
        id: data.id ?? "",
        name: data.name ?? "",
        phone: formatPhoneNumber(data.phone ?? ""),
        birthDate: formatBirthDate(data.birthDate ?? ""),
      };

      // 서버가 반환한 정보로 카드와 입력값 갱신
      setProfile(updatedProfile);
      setForm(updatedProfile);

      // 헤더 등에서 사용하는 로그인 회원정보도 갱신
      useAuthStore.setState((state) => {
        if (state.user?.id !== data.id) return state;

        return {
          user: {
            ...state.user,
            ...data,
          },
        };
      });

      // 저장 중 닫기 방지 함수를 거치지 않고 성공 시 닫기
      setIsEditOpen(false);
      showToast("회원정보를 수정했습니다.");
    } catch (error) {
      setSaveError(
        error.message || "회원정보 수정에 실패했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // 같은 구조의 정보를 배열로 만들어 반복 출력
  const rows = [
    {
      label: "이름",
      value: profile.name ? `${profile.name}님` : "미등록",
    },
    {
      label: "이메일",
      value: profile.id || "미등록",
    },
    {
      label: "전화번호",
      value: profile.phone || "미등록",
    },
    {
      label: "생년월일",
      value: profile.birthDate || "미등록",
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
          onClick={openEditModal}
          disabled={isLoading || Boolean(loadError) || isSaving}
        >
          수정하기
        </OutlineButton>
      </CardHeader>

      {isLoading ? (
        <p role="status">회원정보를 불러오는 중입니다.</p>
      ) : loadError ? (
        <div role="alert">
          <p>{loadError}</p>
          <OutlineButton
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            다시 불러오기
          </OutlineButton>
        </div>
      ) : (
        <ProfileList>
          {rows.map(({ label, value }) => (
            <ProfileRow key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </ProfileRow>
          ))}
        </ProfileList>
      )}
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
              disabled={isSaving}
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="이름을 2~8자로 입력해주세요"
              minLength={2}
              maxLength={8}
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "profile-name-error" : undefined}
            />
            {errors.name && (
              <ProfileFormError id="profile-name-error" role="alert">
                {errors.name}
              </ProfileFormError>
            )}
          </ProfileField>

          <ProfileField>
            <ProfileLabel htmlFor="profile-phone">전화번호</ProfileLabel>

            <ProfileInput
              id="profile-phone"
              name="phone"
              type="tel"
              disabled={isSaving}
              autoComplete="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
              pattern="01[016789]-[0-9]{3,4}-[0-9]{4}"
              title="010-1234-5678 형식으로 입력해주세요."
              maxLength={13}
              required
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "profile-phone-error" : undefined
              }
            />
            {errors.phone && (
              <ProfileFormError id="profile-phone-error" role="alert">
                {errors.phone}
              </ProfileFormError>
            )}
          </ProfileField>

          <ProfileField>
            <ProfileLabel htmlFor="profile-birth-date">생년월일</ProfileLabel>

            <ProfileInput
              id="profile-birth-date"
              name="birthDate"
              type="text"
              disabled={isSaving}
              inputMode="numeric"
              autoComplete="off"
              value={form.birthDate}
              onChange={handleChange}
              placeholder="2000.05.14"
              maxLength={10}
              required
              aria-invalid={Boolean(errors.birthDate)}
              aria-describedby={
                errors.birthDate ? "profile-birth-date-error" : undefined
              }
            />
            {errors.birthDate && (
              <ProfileFormError id="profile-birth-date-error" role="alert">
                {errors.birthDate}
              </ProfileFormError>
            )}
          </ProfileField>

          {saveError && (
            <ProfileFormError role="alert">{saveError}</ProfileFormError>
          )}

          <ProfileModalActions>
            <ProfileCancelButton
              type="button"
              onClick={closeEditModal}
              disabled={isSaving}
            >
              취소
            </ProfileCancelButton>

            <ProfileSaveButton type="submit" disabled={isSaving}>
              {isSaving ? "저장 중..." : "저장하기"}
            </ProfileSaveButton>
          </ProfileModalActions>
        </ProfileEditForm>
      </Modal>
    </Card>
  );
}
