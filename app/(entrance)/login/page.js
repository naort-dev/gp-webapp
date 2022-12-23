import { getServerUser } from 'helpers/userServerHelper';
import { redirect } from 'next/navigation';
import LoginPage from './components/LoginPage';

export default async function Page() {
  const user = getServerUser();
  if (user) {
    redirect('/profile');
  }
  return <LoginPage />;
}
