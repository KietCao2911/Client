import { useCallback } from "react";
import { useSearchParams } from "react-router-dom"

export const useQueryString=()=>
{    const [searchParams] = useSearchParams();

  return   Object.fromEntries([...searchParams])
}