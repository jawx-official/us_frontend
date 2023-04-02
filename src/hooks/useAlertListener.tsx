import {
    Alert,
    useToast,
    AlertIcon,
    AlertTitle,
    CloseButton,
    AlertDescription,
    ToastPosition,
} from '@chakra-ui/react';
import upperFirst from 'lodash/upperFirst';
import { useRef, useEffect } from 'react';
import type { StoreApi, UseBoundStore } from 'zustand';

const useAlertListener = (
    store: UseBoundStore<StoreApi<any>>,
    p: {
        message?: string | null;
        pos?: ToastPosition;
        status: 'error' | 'success' | 'info' | 'warning';
    },
    flag = true
) => {
    const toast = useToast();
    const toastIdRef = useRef<any>(null);

    useEffect(() => {
        if (p.message && flag) {
            if (!toast.isActive(p.message.replaceAll(" ", "-"))) {
                toastIdRef.current = toast({
                    id: p.message.replaceAll(" ", "-"),
                    position: p.pos || 'top',
                    duration: 5000,
                    containerStyle: {
                        marginBottom: -2,
                        width: '1440px',
                        maxWidth: '100%',
                    },
                    render: () => (
                        <Alert
                            w="full"
                            py={6}
                            status={p.status}
                            justifyContent="center"
                            variant="solid"
                        >
                            <AlertIcon />
                            <AlertTitle fontSize="xl">{`${upperFirst(p.status)}!`}</AlertTitle>
                            <AlertDescription fontSize="xl">{p.message}</AlertDescription>
                            <CloseButton
                                top={2}
                                right={2}
                                position="absolute"
                                onClick={() => {
                                    if (toastIdRef.current) {
                                        toast.close(toastIdRef.current);
                                    }
                                    store.setState((state: any) => ({
                                        ...state,
                                        error: null,
                                        message: null,
                                    }));
                                }}
                            />
                        </Alert>
                    ),
                });
            }

        }

        return () => {
            setTimeout(
                () =>
                    store.setState((state: any) => ({
                        ...state,
                        message: null,
                        error: undefined,
                    })),
                5000
            );
        };
    }, [p.message, p.pos, p.status, flag, store, toast]);

    return null;
};

export default useAlertListener;