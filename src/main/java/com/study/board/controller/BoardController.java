package com.study.board.controller;

import com.study.board.entity.board;
import com.study.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Controller
public class BoardController {
    @Autowired
    private BoardService boardService;

    @GetMapping(value =  {"/board/list", "/board/view","/board/write", "/myprofile"})
    public String forward() {
        return "forward:/index.html";
    }
    @GetMapping("/server/write")
    public String BoardWriteForm() {
        return "BoardWrite";
    }
    @RequestMapping(value = "/server/writePro", method = RequestMethod.POST)
    @ResponseBody
    public void BoardWritePro(board board) throws Exception{
        boardService.write(board);
    }

    @RequestMapping("/server/list")
    @ResponseBody
    public Map<String, Object> BoardList(@PageableDefault(page = 0, size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable,
                                         String searchKeyword) {
        Map<String, Object> map = new HashMap<>();
        Page<board> list = null;
        if(searchKeyword==null) {
            list = boardService.boardList(pageable);
        }
        else {
            list = boardService.boardSearchList(searchKeyword, pageable);
        }
        int nowPage = list.getPageable().getPageNumber() + 1;
        int startPage = Math.min(Math.max(nowPage - 2, 1), list.getTotalPages() - 4);
        int endPage = startPage + 4;
        map.put("list", list);
        map.put("nowPage", nowPage);
        map.put("startPage", startPage);
        map.put("endPage", endPage);
        return map;
    }

    @RequestMapping("/server/view")
    @ResponseBody
    public board BoardView(Integer id) {
        return boardService.boardView(id);
    }

    @RequestMapping("/server/delete")
    @ResponseBody
    public void BoardDelete(Integer id) {
        boardService.boardDelete(id);
    }

    @GetMapping("/server/modify/{id}")
    public String BoardModify(@PathVariable("id") Integer id, Model model) {
        model.addAttribute("board", boardService.boardView(id));
        return "BoardModify";
    }

    @PostMapping("/server/update/{id}")
    public String BoardUpdate(@PathVariable("id") Integer id, board board, Model model, MultipartFile file) throws Exception{
        board boardTemp = boardService.boardView(id);
        boardTemp.setTitle(board.getTitle());
        boardTemp.setContent(board.getContent());
        boardService.write(boardTemp);
        model.addAttribute("message", "modify complete");
        model.addAttribute("url", "/board/list");
        return "message";
    }
}
