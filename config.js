/* =========================================================
   CONFIG — แก้ข้อความ รูป และตัวละครได้ที่ไฟล์นี้ไฟล์เดียว
   ========================================================= */
window.CONFIG = {
  /* รูปผู้รับ (ใส่ได้หลายรูป): วางไฟล์ไว้ที่ assets/photo/ (JPG / PNG / WebP)
     aspect = สัดส่วนกรอบรูป | position = จุดโฟกัสของการครอป (x y) | scale = ซูม | rotate = เอียงกรอบ (องศา) */
  recipientPhotos: [
    { src: "assets/photo/recipient-alt.jpg", aspect: "3 / 4", position: "50% 30%", scale: 1, rotate: -3 },
    { src: "assets/photo/recipient.jpg",     aspect: "1 / 1", position: "40% 40%", scale: 1, rotate: 3 }
  ],

  /* พื้นที่ตัวละคร (ใส่รูป Stitch ของคุณเอง PNG/WebP/GIF พื้นหลังโปร่งใส)
     ตัวละครอยู่กึ่งกลางจอในแต่ละหน้า | src: "" = ไม่แสดงอะไรเลย
     width/height = ขนาด | align: "center" | "left" | "right"
     offsetX/offsetY = ขยับเพิ่มเล็กน้อย เช่น "-10px" | rotate = หมุน (องศา) | scale = ซูม
     animation: "" | "float" | "twinkle" */
  characters: {
    p1:   { src: "assets/characters/shy.gif",   width: "190px", height: "auto", align: "center", offsetX: "0px", offsetY: "0px", rotate: 0, scale: 1, animation: "float" },
    p2:   { src: "assets/characters/heart.gif", width: "175px", height: "auto", align: "center", offsetX: "0px", offsetY: "0px", rotate: 0, scale: 1, animation: "float" },
    p3:   { src: "assets/characters/roses.gif", width: "130px", height: "auto", align: "center", offsetX: "0px", offsetY: "0px", rotate: 0, scale: 1, animation: "float" },
    card: { src: "assets/characters/hug.gif",   width: "120px", height: "auto", align: "center", offsetX: "0px", offsetY: "0px", rotate: 0, scale: 1, animation: "float" }
  },

  colors: { blue: "#62C5E8", sky: "#BDEBFA", lav: "#C9B7F5", pink: "#FFD6E7", cream: "#FFF9F0", navy: "#253858" },
  anim: { letterOpenMs: 1300, scanMs: 3600, heartsEveryMs: 1600 },

  p1: {
    heading: "เค้ามีอะไรจะบอกตัว 💗",
    openBtn: "อ่านสิ่งที่เค้าอยากบอก 💌",
    paragraphs: [
      "มันอาจจะเร็วไปสำหรับตัว แต่เค้าอยากรู้จัก อยากเรียนรู้ไปอีกสเตปอ่ะ",
      "เค้าไม่ได้อยากเร่งรัดตัวหรือกดดัน หรืออยากทำให้ตัวอึดอัดนะ ตัวสามารถปฏิเสธได้นะ เค้าไม่บังคับตัว เคารพการตัดสินใจของตัว",
      "เค้าตอนนี้มันรู้สึกแบบนี้ แล้วก็อยากที่จะพูดจะบอก ไม่อยากเก็บไว้แล้วล่ะ",
      "เค้าไม่เคยทำแบบนี้ให้ใครเลยนะ ตัวคนแรกเลย เค้าไม่ได้โกหกนะ 555 ตัวน่าจะไม่เชื่อแน่นอน",
      "แต่เค้าเดาไม่เก่งหรอกว่าตัวจะรู้สึกเหมือนกันไหม เค้าหวังว่าตัวจะรู้สึกเหมือนกันนะ",
      "เค้าไม่อยากเป็นแค่คนคุยแล้วอ่ะ เค้าใจร้อน 5555 มาเป็นแฟนเค้าได้แล้ว เค้าจะเฉาแล้วนะ 😅"
    ],
    nextBtn: "อ่านต่อไปอีกนิด 💗"
  },

  p2: {
    heading: "ก่อนจะไปต่อ... ขอเช็กตัวตนหน่อยนะ 🤫",
    message: "มีความลับอีกอย่างซ่อนอยู่ข้างใน พร้อมเปิดดูหรือยัง?",
    scanBtn: "แตะเพื่อสแกนนิ้ว 💗",
    status: ["กำลังสแกน...", "กำลังตรวจสอบความลับ...", "เจออะไรบางอย่างแล้ว! 💖"],
    nextBtn: "เปิดความลับต่อเลย 💌"
  },

  p3: {
    question: "เป็นแฟนกับเค้าได้ไหม? 💗",
    sub: "ถ้าใจตรงกัน ก็ตอบตกลงด้วยนะ 😁"
  },

  /* anim: yes = ฉลองเบา ๆ | maybe = นุ่มนวล | no = สงบ เคารพ */
  answers: [
    { label: "ตกลง เป็นแฟนกันนะ 💗", anim: "yes",
      message: "เย้! ขอบคุณนะที่ให้โอกาสเค้า ต่อจากนี้เรามาเรียนรู้และดูแลความรู้สึกของกันและกันไปทีละก้าวนะ 🥰" },
    { label: "ขอคิดดูก่อนนะ 🥺", anim: "maybe",
      message: "ได้เลยนะ ค่อย ๆ คิดก็ได้ เค้าอยากให้ตัวตัดสินใจจากความรู้สึกของตัวเองจริง ๆ 💗" },
    { label: "ยังไม่พร้อมนะ", anim: "no",
      message: "ขอบคุณที่บอกความรู้สึกของตัวเองนะ เค้าเคารพการตัดสินใจของตัว ไม่ต้องรู้สึกผิดเลยนะ 🤍" }
  ],

  card: {
    heading: "คำตอบจากคนพิเศษ 💌",
    instruction: "แคปหน้าจอนี้แล้วส่งให้เค้าทางแชตนะ 💗",
    change: "เปลี่ยนใจ เลือกคำตอบใหม่ 🔄",
    exit: "จบการอ่านข้อความ 💗"
  },
  /* หน้าสุดท้ายแบบเงียบ ๆ (ข้อความนี้เป็นข้อความเสริม แก้ได้ตามใจ) */
  end: { text: "ขอบคุณที่อ่านข้อความของเค้านะ 🤍", back: "กลับไปดูคำตอบ" }
};
