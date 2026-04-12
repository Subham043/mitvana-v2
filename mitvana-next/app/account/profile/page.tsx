import PasswordForm from "./_components/PasswordForm";
import ProfileForm from "./_components/ProfileForm";

export default function Profile() {
  return (
    <>
      <ProfileForm />
      <div className="mt-4">
        <PasswordForm />
      </div>
    </>
  );
}
