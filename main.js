function addExercise() {
    var input = document.getElementById("exercise-input");
    var exercise = input.value;
    if (exercise === '') {
        alert("운동을 입력해주세요.");
        return;
    }
    var li = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // 체크 박스 클릭 이벤트 리스너 추가
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add("checked");
        } else {
            li.classList.remove("checked");
        }
    });

    var textSpan = document.createElement("span");
    textSpan.textContent = exercise;

    textSpan.onclick = function() {
        var confirmDelete = confirm("이 운동을 삭제하시겠습니까?");
        if (confirmDelete) {
            li.remove();
        }
    };

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    document.getElementById("exercise-list").appendChild(li);

    input.value = ""; // 입력란 초기화
}

// 모든 앵커 태그에 대한 클릭 이벤트 리스너 추가
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // 기본 이동 동작 방지

        // href 속성에서 앵커의 대상 ID를 가져옴
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // scrollIntoView() 메서드를 사용해 해당 요소로 부드럽게 스크롤하고 화면 가운데에 위치시킴
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});