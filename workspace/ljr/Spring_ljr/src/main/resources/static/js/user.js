let emailChecked = false;
let emailAvailable = false;

// 이메일 조합 함수
function buildEmail() {
    const idPart = document.getElementById("emailId").value;
    const domainPart = document.getElementById("emailDomain").value;

    if (idPart === "" || domainPart === "") {
        return "";
    }

    // @는 여기서 자동으로 붙음
    return idPart + "@" + domainPart;
}

// 이메일 중복 확인
function checkEmail() {
    const fullEmail = buildEmail();

    if (fullEmail === "") {
        alert("이메일 아이디와 도메인을 모두 입력하세요.");
        return;
    }

    // hidden input에 fullEmail 저장
    document.getElementById("emailInput").value = fullEmail;

    fetch("/user/checkEmail?email=" + encodeURIComponent(fullEmail))
        .then(res => res.text())
        .then(result => {
            const msg = document.getElementById("emailCheckResult");
            emailChecked = true;

            if (result === "duplicate") {
                msg.textContent = "이미 사용 중인 이메일입니다.";
                msg.style.color = "red";
                emailAvailable = false;
            } else {
                msg.textContent = "사용 가능한 이메일입니다.";
                msg.style.color = "green";
                emailAvailable = true;
            }
        });
}

// 변경될 때 중복 확인 초기화
function resetEmailCheck() {
    emailChecked = false;
    emailAvailable = false;
    document.getElementById("emailCheckResult").textContent = "";
}

// submit 시 검사
function validateForm() {
    const fullEmail = buildEmail();
    document.getElementById("emailInput").value = fullEmail;

    if (!emailChecked) {
        alert("이메일 중복 확인을 먼저 진행하세요.");
        return false;
    }
    if (!emailAvailable) {
        alert("사용할 수 없는 이메일입니다.");
        return false;
    }
    return true;
}
