import { userResponseType } from '@ecommerce/types';
import {
  Card,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@ecommerce/ui-kit/ui';
import { useContext } from 'react';
import { useGetUserQuery } from '../store/user/api';
import AuthContext from '../store/context/Authcontext';
import { AlertCircle } from 'lucide-react';

type UserQueryResult = ReturnType<typeof useGetUserQuery>;

export default function Profile() {
  const authctx = useContext(AuthContext);
  const { token } = authctx;
  const { data, isLoading, error } = useGetUserQuery(token) as UserQueryResult;

  const user = data as userResponseType | undefined;

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Skeleton className="w-20 h-20 rounded-full bg-gray-200" />
              <div>
                <Skeleton className="w-32 h-6 bg-gray-200 mb-2" />
                <Skeleton className="w-48 h-4 bg-gray-200" />
                <Skeleton className="w-16 h-6 bg-gray-200 mt-2" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-gray-500">Member Since</dt>
                <Skeleton className="w-24 h-6 bg-gray-200" />
              </div>
              <div>
                <dt className="font-medium text-gray-500">Locations</dt>
                <Skeleton className="w-48 h-6 bg-gray-200" />
              </div>
            </dl>
          </CardContent>
          <CardFooter>
            <Skeleton className="w-32 h-6 bg-gray-200" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-sm m-4 mx-auto">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {`An error occurred: ${
            (error as { message?: string }).message || 'Please try again later.'
          }`}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {user && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={'/path/to/avatar.png'} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge variant="outline" className="mt-2">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-gray-500">Member Since</dt>
                <dd>
                  {new Date(user.creationDate).toISOString().split('T')[0]}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Locations</dt>
                <dd>{user.locations.map((loc) => loc.city).join(', ')}</dd>
              </div>
            </dl>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
