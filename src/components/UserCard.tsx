interface UserCardProps {
  name: string;
  email: string;
  role?: string;
}

export function UserCard({ name, email, role = "member" }: UserCardProps) {
  return (
    <article className="border rounded-lg p-4 shadow-sm" data-testid="user-card">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-gray-600">{email}</p>
      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
        {role}
      </span>
    </article>
  );
}
