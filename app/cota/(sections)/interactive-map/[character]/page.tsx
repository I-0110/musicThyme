import { redirect } from "next/navigation";

export default function Page({
    params
} : {
    params: { character: string }
}) {
    // Redirect to overview by default
    redirect(`/cota/interactive-map/${params.character}`);
}