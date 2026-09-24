# Website cá nhân — Nguyễn Linh Anh

## Cấu trúc file
```
index.html
style.css
script.js
assets/
  profile.jpg                    → ảnh chân dung ở hero
  activities/
    circle-of-courage/1.jpg .. 3.jpg   (album 3 ảnh)
    obas-group/1.jpg                   (ảnh đơn)
    anatolie-project/1.jpg, 2.jpg      (album 2 ảnh)
    hestia/1.jpg                       (ảnh đơn)
    clover-english/1.jpg .. 3.jpg      (album 3 ảnh)
```

## Thay ảnh thật
Tất cả ảnh trong `assets/` hiện là placeholder (khối màu có icon máy ảnh + tên hoạt động).
Chỉ cần **ghi đè đúng tên file cũ** bằng ảnh thật (cùng đuôi `.jpg`, không cần sửa code):
- Ảnh dọc/vuông cho `profile.jpg` (tỉ lệ ~4:5 là đẹp nhất)
- Ảnh ngang cho các ảnh hoạt động (tỉ lệ ~4:3)

Muốn **thêm ảnh vào 1 album** (ví dụ thêm ảnh 3 cho `obas-group`):
1. Thêm file `assets/activities/obas-group/2.jpg`
2. Trong `index.html`, tìm nút bấm của hoạt động đó và thêm dòng đếm:
   ```html
   <span class="activity__count">1 / 2</span>
   ```
   (script.js tự đọc số này để biết album có bao nhiêu ảnh)

Muốn **thêm hoạt động mới**: copy nguyên 1 khối `<article class="activity" data-group="...">...</article>` trong `index.html`, đổi `data-group`, nội dung, và đường dẫn ảnh tương ứng trong `assets/activities/<slug-mới>/`.

## Mục Research & Personal Products
Hai mục này đang để placeholder theo yêu cầu — sửa trực tiếp trong `index.html`:
- Research: tìm `<section class="research" id="research">`
- Personal Products: tìm `<section class="work" id="work">`, mỗi `<div class="work-card work-card--placeholder">` là 1 thẻ, thay bằng ảnh/nội dung dự án thật khi có.

## Deploy lên GitHub Pages
1. Tạo repo mới, đẩy toàn bộ nội dung folder này (giữ nguyên cấu trúc) lên nhánh `main`
2. Vào Settings → Pages → chọn nhánh `main`, thư mục `/root`
3. Web sẽ chạy ở `https://<username>.github.io/<repo>/`

Không cần build step, không cần cài gì — mở thẳng `index.html` trên máy cũng xem được.
