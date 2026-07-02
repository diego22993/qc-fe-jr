// SRP: única responsabilidad → lógica de server state de empleados.
// DIP: depende de empleados.api.ts, no de fetch directamente.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  bajaEmpleado,
  crearEmpleado,
  editarEmpleado,
  getEmpleadoPorId,
  getEmpleados,
} from "../../../api/empleado.api";
import type {
  EmpleadoFormData,
  EmpleadoEditData,
} from "../types/empleado.types";

const QUERY_KEY = ["empleados"] as const;

export const useEmpleados = () => {
  const {
    data: empleados = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getEmpleados,
  });

  return { empleados, isLoading, isError };
};

export const useEmpleadoPorId = (id: string) => {
  const {
    data: empleado,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => getEmpleadoPorId(id),
    enabled: !!id,
  });
  return { empleado, isLoading, isError };
};

export const useCrearEmpleado = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: EmpleadoFormData) => crearEmpleado(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      onSuccess?.();
    },
  });
};

export const useEditarEmpleado = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<EmpleadoEditData>;
    }) => editarEmpleado(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      onSuccess?.();
    },
  });
};

export const useBajaEmpleado = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bajaEmpleado(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      onSuccess?.();
    },
  });
};
