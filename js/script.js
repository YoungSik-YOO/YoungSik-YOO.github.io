var listNo = 0;

function addTask() {
    const trEl = $("<tr>");
    let task = $("#taskInput").val();
    
    if(task == "") {
        alert("할일을 입력해주세요!");
        $("#taskInput").focus();
        return;
    }

    let html = `<td class="align-center">${++listNo}</td><td onclick="drawline(this)">${task}</td><td class="align-center"><input type="checkbox"></td>`;
    trEl.html(html);
    $("table").append(trEl);
    $("#taskInput").val("");
}

function delCheckList() {
    $("td > [type='checkbox']").each(function() {
        if($(this).is(":checked")) {
            $(this).closest("tr").remove();
        }
    });
    $("th > [type='checkbox']").prop("checked", false);
}

function allCheck(ckbx) {
    let check = ckbx.checked;

    $("td > [type='checkbox']").each(function() {
        $(this).prop("checked", check);
    });
}

function inputKey(e) {
    if(e.key == 'Enter') addTask();
}

function drawline(tdEl) {
    $(tdEl).toggleClass("through-line");
//    tdEl.classList.toggle("through-line");
}

var postNo = 0;

function write_post() {
    let title = $("[name='title']").val();
    let content = $("[name='content']").val();
    let name = $("[name='name']").val();

    if(title == "") {
        alert("제목을 입력해주세요.");
        $("[name='title']").focus();
        return;
    }
    if(content == "") {
        alert("내용을 입력해주세요.");
        $("[name='content']").focus();
        return;
    }
    if(name == "") {
        alert("작성자를 입력해주세요.");
        $("[name='name']").focus();
        return;
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    let writeDate = `${year}-${month}-${day}`;

    const tableEl = $("#list > table");
    const trEl = $("<tr>");

    postNo++;
    let html = `<td><input type="checkbox"></td>
                <td id="no${postNo}">${postNo}</td>
                <td class="mouse-over" onclick="openRead(this)">${title}</td>
                <td>${content}</td>
                <td>${name}</td>
                <td>${writeDate}</td>`;

    trEl.html(html);
    tableEl.append(trEl);
    $("[name='title']").val("");
    $("[name='content']").val("");
    $("[name='name']").val("");

    closeWrite();
}

$(document).ready(function() {
    $('[value="글쓰기"]').click(function () {
        $("#inputForm").show();
    });
});

function closeWrite() {
    $("#inputForm").hide();
}

function openRead(titleEl) {
    const noEl = $(titleEl).prev();
    const contentEl = $(titleEl).next();
    const nameEl = contentEl.next();
    const dateEl = nameEl.next();

    let no = noEl.text();
    let title = $(titleEl).text();
    let content = contentEl.text();
    let name = nameEl.text();
    let date = dateEl.text();

    $("#read-no").text(no);
    $("#read-title").text(title);
    $("#read-content").text(content);
    $("#read-name").text(name);
    $("#read-date").text(date);

    $("#save-button").hide();
    $("#readForm").show();
}

function closeRead() {
    $("#readForm").hide();
    $("#save-button").hide();
    $("#edit-button").show();
}

function edit_post() {
    const titleEl = $("#read-title");
    const contentEl = $("#read-content");
    let title = titleEl.text();
    let content = contentEl.text();

    titleEl.html(`<input type="text" value="${title}" id="edit_title">`);
    contentEl.html(`<input type="text" value="${content}" id="edit_content">`);

    $("#save-button").show();
    $("#edit-button").hide();
}

function save_post() {
    let title = $("#read-title").children().val();
    let content = $("#read-content").children().val();
    let postNoId = "no" + $("#read-no").text();

    $(`[id=${postNoId}]`).next().text(title);
    $(`[id=${postNoId}]`).next().next().text(content);
    closeRead();
}
