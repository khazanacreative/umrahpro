import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/Ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SECTIONS: { judul: string; isi: string }[] = [
  { judul: "Persiapan Umroh", isi: "Siapkan fisik, mental, dan ilmu. Lengkapi paspor, visa, vaksin meningitis, serta perlengkapan ihram dan obat pribadi." },
  { judul: "Panduan Ihram", isi: "Mandi sunnah, memakai wewangian sebelum ihram, mengenakan dua lembar kain putih tanpa jahitan bagi laki-laki, lalu berniat umroh di miqat." },
  { judul: "Panduan Miqat", isi: "Miqat jamaah Indonesia umumnya Yalamlam, Qarnul Manazil, atau Bir Ali bila dari Madinah. Niat wajib dilakukan sebelum melewati miqat." },
  { judul: "Talbiyah", isi: "Labbaik Allahumma labbaik, labbaika laa syarika laka labbaik. Innal hamda wan ni'mata laka wal mulk, laa syarika lak." },
  { judul: "Tata Cara Tawaf", isi: "Tujuh putaran mengelilingi Ka'bah dimulai dan diakhiri di Hajar Aswad, posisi Ka'bah di sebelah kiri, diakhiri shalat sunnah dua rakaat di belakang Maqam Ibrahim." },
  { judul: "Tata Cara Sai", isi: "Tujuh kali perjalanan antara Shafa dan Marwah, dimulai dari Shafa dan berakhir di Marwah, disunnahkan berlari kecil bagi laki-laki di antara dua pilar hijau." },
  { judul: "Tahallul", isi: "Mencukur atau memendekkan rambut sebagai penanda selesainya rangkaian umroh dan berakhirnya larangan ihram." },
  { judul: "Adab di Masjidil Haram", isi: "Jaga kebersihan, tidak mendorong jamaah lain, dahulukan kaki kanan saat masuk, perbanyak dzikir dan doa." },
  { judul: "Adab di Madinah", isi: "Perbanyak shalat di Masjid Nabawi, ucapkan salam kepada Rasulullah dan dua sahabat, jaga ketenangan." },
  { judul: "Panduan Raudhah", isi: "Masuk sesuai jadwal tasreh dari aplikasi resmi, tidak berdesakan, manfaatkan waktu singkat untuk shalat dan doa." },
  { judul: "Ziarah Situs Bersejarah", isi: "Jabal Nur, Jabal Tsur, Arafah, Masjid Quba, Jabal Uhud, dan Masjid Qiblatain." },
  { judul: "Tips Belanja", isi: "Tawar dengan sopan, simpan struk, perhatikan batas berat bagasi maskapai." },
  { judul: "Tips Kesehatan", isi: "Minum air cukup, gunakan masker saat padat, bawa obat pribadi, hindari kelelahan berlebih." },
  { judul: "Informasi Darurat", isi: "Selalu bawa kartu identitas hotel dan nomor muthawif. Jangan berpisah dari rombongan." },
  { judul: "Paspor Hilang", isi: "Segera lapor muthawif dan hubungi KJRI Jeddah atau KBRI Riyadh untuk penerbitan SPLP." },
  { judul: "Jamaah Tersesat", isi: "Tetap di tempat terbuka yang mudah dikenali, hubungi nomor darurat rombongan, tunjukkan kartu identitas hotel." },
  { judul: "Informasi Rumah Sakit", isi: "Klinik Masjidil Haram, RS An-Noor Makkah, dan RS King Fahd Madinah tersedia 24 jam." },
  { judul: "Nomor Darurat Saudi", isi: "Polisi 999 · Ambulans 997 · Pemadam 998 · Layanan Jamaah 940." },
];

const CHECKLIST = [
  "Paspor & visa",
  "Kain ihram / mukena",
  "Obat pribadi",
  "Kartu identitas rombongan",
  "Buku doa & panduan",
  "Sandal dan tas kecil",
  "Uang riyal secukupnya",
  "Sertifikat vaksin",
];

export const Route = createFileRoute("/panduan")({
  head: () => ({
    meta: [
      { title: "Panduan Digital Umroh — UmrahPro" },
      { name: "description", content: "Panduan lengkap ibadah umroh: ihram, miqat, tawaf, sai, tahallul, adab, dan informasi darurat." },
      { property: "og:title", content: "Panduan Digital Umroh — UmrahPro" },
      { property: "og:description", content: "Panduan ibadah umroh lengkap dengan checklist interaktif." },
    ],
  }),
  component: PanduanPage,
});

function PanduanPage() {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <AppShell>
      <PageHeader title="Panduan Digital Umroh" description="Bimbingan ibadah lengkap untuk jamaah" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="size-4 text-primary" /> Materi Panduan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {SECTIONS.map((s) => (
                <AccordionItem key={s.judul} value={s.judul}>
                  <AccordionTrigger className="text-left text-sm">{s.judul}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {s.isi}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card className="card-elevated h-fit">
          <CardHeader>
            <CardTitle className="text-base">Checklist Persiapan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {CHECKLIST.map((c) => (
              <label key={c} className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={checked.includes(c)}
                  onCheckedChange={(v) =>
                    setChecked((prev) => (v ? [...prev, c] : prev.filter((x) => x !== c)))
                  }
                />
                <span className={checked.includes(c) ? "text-muted-foreground line-through" : ""}>
                  {c}
                </span>
              </label>
            ))}
            <p className="pt-2 text-xs text-muted-foreground">
              {checked.length}/{CHECKLIST.length} selesai
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
