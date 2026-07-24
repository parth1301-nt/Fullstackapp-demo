'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteSubdomainAction } from '@/app/actions';

type DeleteState = {
  error?: string;
  message?: string;
  success?: boolean;
};

export default function DeleteSubdomainButton({ subdomain }: { subdomain: string }) {
  const [state, action, isPending] = useActionState<DeleteState, FormData>(
    deleteSubdomainAction,
    {}
  );

  return (
    <>
      <form action={action}>
        <input type="hidden" name="subdomain" value={subdomain} />
        <Button
          variant="ghost"
          size="icon"
          type="submit"
          disabled={isPending}
          className="text-gray-500 hover:text-red-600 hover:bg-red-50"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Trash2 className="h-5 w-5" />
          )}
        </Button>
      </form>
      {state.error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-md">
          {state.error}
        </div>
      )}
      {state.message && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md">
          {state.message}
        </div>
      )}
    </>
  );
}
