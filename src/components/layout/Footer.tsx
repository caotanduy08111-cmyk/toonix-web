import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

const LINK_COLUMNS = [
  {
    title: "Khám phá",
    links: [
      { href: "/danh-sach", label: "Danh sách truyện" },
      { href: "/the-loai", label: "Thể loại" },
      { href: "/bxh", label: "Bảng xếp hạng" },
      { href: "/cong-dong", label: "Cộng đồng" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { href: "#", label: "Câu hỏi thường gặp" },
      { href: "#", label: "Liên hệ hỗ trợ" },
      { href: "#", label: "Báo lỗi nội dung" },
      { href: "#", label: "Góp ý" },
    ],
  },
  {
    title: "Điều khoản",
    links: [
      { href: "#", label: "Điều khoản sử dụng" },
      { href: "#", label: "Chính sách bảo mật" },
      { href: "#", label: "Quy định bản quyền" },
      { href: "#", label: "Chính sách quảng cáo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-8 px-3 py-10 sm:px-4 lg:px-6 xl:px-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <Logo className="h-8" />
            <p className="text-sm text-ink-300">
              Nền tảng đọc truyện tranh trực tuyến, hàng ngàn bộ truyện thuộc
              nhiều thể loại, cập nhật mỗi ngày.
            </p>
            <address className="not-italic text-sm text-ink-300">
              Công ty TNHH Toonix Media
              <br />
              613 Âu Cơ, Tân Phú, TP. Hồ Chí Minh
              <br />
              <a
                href="mailto:lienhe@toonix.vn"
                className="hover:text-cyan-400"
              >
                lienhe@toonix.vn
              </a>
              <br />
              <a href="tel:+842838001234" className="hover:text-cyan-400">
                (028) 3800 1234
              </a>
            </address>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-2.5">
              <p className="text-sm font-semibold text-ink-50">{col.title}</p>
              {col.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-ink-300 hover:text-cyan-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-navy-800 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Toonix Media. Bảo lưu mọi quyền.</p>
          <p>Toonix là sản phẩm demo, nội dung và dữ liệu chỉ mang tính minh hoạ.</p>
        </div>
      </div>
    </footer>
  );
}
